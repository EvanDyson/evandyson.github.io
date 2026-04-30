import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chess, type Square } from 'chess.js';

type Difficulty = 'easy' | 'medium' | 'hard';
type PlayerColor = 'w' | 'b';
type Score = { type: 'cp' | 'mate'; value: number };

interface DifficultySetting {
  label: string;
  skillLevel: number;
  depth: number;
  randomChance: number;
}

interface BoardSquare {
  name: Square;
  color: 'light' | 'dark';
  piece: string;
  selected: boolean;
  legal: boolean;
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'] as const;

const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySetting> = {
  easy: {
    label: 'Easy',
    skillLevel: 2,
    depth: 3,
    randomChance: 0.45
  },
  medium: {
    label: 'Medium',
    skillLevel: 8,
    depth: 7,
    randomChance: 0.15
  },
  hard: {
    label: 'Hard',
    skillLevel: 15,
    depth: 11,
    randomChance: 0
  }
};

const PIECES: Record<string, string> = {
  wp: '&#9817;',
  wn: '&#9816;',
  wb: '&#9815;',
  wr: '&#9814;',
  wq: '&#9813;',
  wk: '&#9812;',
  bp: '&#9823;',
  bn: '&#9822;',
  bb: '&#9821;',
  br: '&#9820;',
  bq: '&#9819;',
  bk: '&#9818;'
};

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="chess-shell">
      <div class="game-header">
        <div>
          <p class="eyebrow">Hidden board</p>
          <h1 class="fraunces italic less-bold">Play The Engine</h1>
        </div>

        <div class="controls">
          <div>
            <label for="difficulty">Difficulty</label>
            <select
              id="difficulty"
              [ngModel]="difficulty()"
              (ngModelChange)="setDifficulty($event)"
              [disabled]="isThinking()"
            >
              @for (level of difficultyOptions; track level) {
                <option [value]="level">{{ settings[level].label }}</option>
              }
            </select>
          </div>

          <div>
            <label for="player-color">Play as</label>
            <select
              id="player-color"
              [ngModel]="playerColor()"
              (ngModelChange)="setPlayerColor($event)"
              [disabled]="!canChangeColor()"
            >
              <option value="w">White</option>
              <option value="b">Black</option>
            </select>
          </div>
        </div>
      </div>

      @if (resultMessage()) {
        <p class="result-banner" [class.win]="resultKind() === 'win'" [class.loss]="resultKind() === 'loss'">
          {{ resultMessage() }}
        </p>
      }

      <div class="game-layout">
        <div class="board-wrap" aria-label="Chess board">
          <div class="board">
            @for (square of board(); track square.name) {
              <button
                type="button"
                class="square"
                [class.light]="square.color === 'light'"
                [class.dark]="square.color === 'dark'"
                [class.selected]="square.selected"
                [class.legal]="square.legal"
                [attr.aria-label]="square.name"
                (click)="selectSquare(square.name)"
                [innerHTML]="square.piece"
              ></button>
            }
          </div>
        </div>

        <aside class="game-panel">
          <div class="button-row">
            <button type="button" class="action-btn primary" (click)="newGame()">
              New Game
            </button>
            <button
              type="button"
              class="action-btn"
              (click)="undoPair()"
              [disabled]="isThinking() || history().length < 2"
            >
              Undo
            </button>
          </div>

          <div class="move-list" aria-label="Move list">
            @for (move of history(); track $index; let index = $index) {
              <span>
                @if (index % 2 === 0) {
                  <strong>{{ (index / 2) + 1 }}.</strong>
                }
                {{ move }}
                @if (moveQualities()[$index]) {
                  <small>{{ moveQualities()[$index] }}</small>
                }
              </span>
            } @empty {
              <span>No moves yet.</span>
            }
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .chess-shell {
      width: min(1100px, calc(100vw - 2rem));
      margin: 2rem auto;
      padding: 1.5rem;
      border: 1px solid #d3cec0;
      border-radius: 8px;
      background: #dfdbcf;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    .game-header,
    .game-layout,
    .button-row {
      display: flex;
      gap: 1rem;
    }

    .game-header {
      align-items: end;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .eyebrow,
    .panel-label {
      margin: 0 0 0.25rem;
      color: #5f563f;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: #1f1f1f;
      font-size: clamp(2rem, 7vw, 3.4rem);
    }

    .result-banner {
      margin: 0 0 1rem;
      padding: 0.85rem 1rem;
      border: 1px solid #8c8168;
      border-radius: 6px;
      background: #f8f4e9;
      color: #1f1f1f;
      font-size: 1.1rem;
      font-weight: 900;
      text-align: center;
    }

    .result-banner.win {
      border-color: #2f7d5c;
      background: #dfeee7;
      color: #153f2d;
    }

    .result-banner.loss {
      border-color: #9a3f37;
      background: #f3dfd9;
      color: #66231d;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      justify-content: flex-end;
    }

    .controls > div {
      display: grid;
      gap: 0.35rem;
      min-width: 150px;
    }

    .controls label {
      font-weight: 700;
    }

    select,
    .action-btn {
      min-height: 42px;
      border: 1px solid #8c8168;
      border-radius: 6px;
      background: #f8f4e9;
      color: #1f1f1f;
      font: inherit;
    }

    select {
      padding: 0 0.75rem;
    }

    .game-layout {
      align-items: flex-start;
    }

    .board-wrap {
      flex: 1 1 620px;
      min-width: 0;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      width: min(100%, 680px);
      aspect-ratio: 1;
      border: 6px solid #4a3423;
      background: #4a3423;
    }

    .square {
      display: grid;
      place-items: center;
      width: 100%;
      aspect-ratio: 1;
      border: 0;
      border-radius: 0;
      color: #181512;
      cursor: pointer;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: clamp(1.6rem, 7vw, 4rem);
      line-height: 1;
    }

    .square.light {
      background: #f0d9b5;
    }

    .square.dark {
      background: #b58863;
    }

    .square.selected {
      outline: 4px solid #2f7d5c;
      outline-offset: -4px;
    }

    .square.legal::after {
      content: '';
      width: 24%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: rgba(47, 125, 92, 0.55);
      position: absolute;
    }

    .square {
      position: relative;
    }

    .game-panel {
      flex: 0 0 280px;
      display: grid;
      gap: 1rem;
      color: #1f1f1f;
    }

    .button-row {
      flex-wrap: wrap;
    }

    .action-btn {
      padding: 0 0.95rem;
      font-weight: 800;
      cursor: pointer;
    }

    .action-btn.primary {
      background: #263f37;
      border-color: #263f37;
      color: white;
    }

    .action-btn:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }

    .move-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem 0.65rem;
      max-height: 210px;
      overflow: auto;
      padding: 0.75rem;
      border: 1px solid #c4bba8;
      border-radius: 6px;
      background: #f4f2ec;
      font-size: 0.95rem;
    }

    .move-list span {
      display: inline-flex;
      align-items: baseline;
      gap: 0.25rem;
    }

    .move-list small {
      color: #2f7d5c;
      font-size: 0.75rem;
      font-weight: 800;
    }

    @media (max-width: 850px) {
      .game-header,
      .game-layout {
        flex-direction: column;
      }

      .game-header {
        align-items: stretch;
      }

      .board-wrap,
      .game-panel {
        flex: none;
        width: 100%;
      }
    }
  `]
})
export default class EnPassantPageComponent implements OnDestroy {
  protected readonly settings = DIFFICULTY_SETTINGS;
  protected readonly difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];
  protected readonly difficulty = signal<Difficulty>('medium');
  protected readonly playerColor = signal<PlayerColor>('w');
  protected readonly selectedSquare = signal<Square | null>(null);
  protected readonly fen = signal(new Chess().fen());
  protected readonly history = signal<string[]>([]);
  protected readonly moveQualities = signal<string[]>([]);
  protected readonly isThinking = signal(false);

  protected readonly canChangeColor = computed(() =>
    !this.isThinking() && this.history().length <= (this.playerColor() === 'b' ? 1 : 0)
  );

  protected readonly resultKind = computed<'win' | 'loss' | 'draw' | null>(() => {
    this.fen();

    if (this.game.isCheckmate()) {
      return this.game.turn() === this.playerColor() ? 'loss' : 'win';
    }

    if (this.game.isDraw()) {
      return 'draw';
    }

    return null;
  });

  protected readonly resultMessage = computed(() => {
    const result = this.resultKind();

    if (result === 'win') {
      return 'You won by checkmate.';
    }

    if (result === 'loss') {
      return 'You lost by checkmate.';
    }

    if (result === 'draw') {
      return 'Draw. The game is over.';
    }

    return '';
  });

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly game = new Chess();
  private engine?: Worker;
  private analysisEngine?: Worker;
  private aiTimeout?: ReturnType<typeof globalThis.setTimeout>;
  private latestAnalysisScore?: Score;
  private analysisRequest?: { id: number; mover: PlayerColor; moveIndex: number };
  private analysisRequestId = 0;

  protected readonly board = computed<BoardSquare[]>(() => {
    this.fen();
    const selected = this.selectedSquare();
    const legalTargets = new Set(
      selected
        ? this.game.moves({ square: selected, verbose: true }).map(move => move.to)
        : []
    );

    const ranks = this.playerColor() === 'w' ? RANKS : [...RANKS].reverse();
    const files = this.playerColor() === 'w' ? FILES : [...FILES].reverse();

    return ranks.flatMap((rank, rankIndex) =>
      files.map((file, fileIndex) => {
        const name = `${file}${rank}` as Square;
        const piece = this.game.get(name);

        return {
          name,
          color: (rankIndex + fileIndex) % 2 === 0 ? 'light' : 'dark',
          piece: piece ? PIECES[`${piece.color}${piece.type}`] : '',
          selected: selected === name,
          legal: legalTargets.has(name)
        };
      })
    );
  });

  constructor() {
    if (this.isBrowser) {
      this.initEngine();
    }
  }

  ngOnDestroy(): void {
    this.clearAiTimeout();
    this.engine?.terminate();
    this.analysisEngine?.terminate();
  }

  protected selectSquare(square: Square): void {
    if (this.isThinking() || this.game.isGameOver() || this.game.turn() !== this.playerColor()) {
      return;
    }

    const selected = this.selectedSquare();
    const piece = this.game.get(square);

    if (!selected) {
      if (piece?.color === this.playerColor()) {
        this.selectedSquare.set(square);
      }
      return;
    }

    if (selected === square) {
      this.selectedSquare.set(null);
      return;
    }

    const move = this.game.move({ from: selected, to: square, promotion: 'q' });

    if (!move) {
      this.selectedSquare.set(piece?.color === this.playerColor() ? square : null);
      return;
    }

    this.afterMove(move.color as PlayerColor);

    if (!this.game.isGameOver()) {
      this.makeAiMove();
    }
  }

  protected setDifficulty(level: Difficulty): void {
    this.difficulty.set(level);
    this.configureEngine();
  }

  protected setPlayerColor(color: PlayerColor): void {
    if (!this.canChangeColor()) {
      return;
    }

    this.game.reset();
    this.playerColor.set(color);
    this.selectedSquare.set(null);
    this.moveQualities.set([]);
    this.syncGame();

    if (color === 'b') {
      this.makeAiMove();
    }
  }

  protected newGame(): void {
    this.game.reset();
    this.selectedSquare.set(null);
    this.isThinking.set(false);
    this.moveQualities.set([]);
    this.syncGame();

    if (this.playerColor() === 'b') {
      this.makeAiMove();
    }
  }

  protected undoPair(): void {
    if (this.isThinking()) {
      return;
    }

    this.game.undo();
    this.game.undo();
    this.selectedSquare.set(null);
    this.moveQualities.set(this.moveQualities().slice(0, this.game.history().length));
    this.syncGame();
  }

  private initEngine(): void {
    try {
      this.engine = new Worker('/stockfish/stockfish-18-lite-single.js');
      this.engine.onmessage = ({ data }) => this.handleEngineMessage(String(data));
      this.engine.onerror = () => {
        this.engine?.terminate();
        this.engine = undefined;
      };
      this.engine.postMessage('uci');
      this.configureEngine();

      this.analysisEngine = new Worker('/stockfish/stockfish-18-lite-single.js');
      this.analysisEngine.onmessage = ({ data }) => this.handleAnalysisMessage(String(data));
      this.analysisEngine.postMessage('uci');
    } catch {
      this.engine = undefined;
    }
  }

  private configureEngine(): void {
    if (!this.engine) {
      return;
    }

    const settings = DIFFICULTY_SETTINGS[this.difficulty()];
    this.engine.postMessage(`setoption name Skill Level value ${settings.skillLevel}`);
    this.engine.postMessage('isready');
  }

  private makeAiMove(): void {
    const moves = this.game.moves({ verbose: true });
    const settings = DIFFICULTY_SETTINGS[this.difficulty()];

    if (!moves.length) {
      return;
    }

    if (!this.engine || Math.random() < settings.randomChance) {
      this.playFallbackMove();
      return;
    }

    this.isThinking.set(true);
    this.engine.postMessage(`position fen ${this.game.fen()}`);
    this.engine.postMessage(`go depth ${settings.depth}`);

    this.clearAiTimeout();
    this.aiTimeout = globalThis.setTimeout(() => this.playFallbackMove(), 7000);
  }

  private handleEngineMessage(message: string): void {
    if (message === 'uciok' || message === 'readyok') {
      return;
    }

    if (!message.startsWith('bestmove')) {
      return;
    }

    this.clearAiTimeout();

    const bestMove = message.split(' ')[1];
    if (!bestMove || bestMove === '(none)') {
      this.isThinking.set(false);
      return;
    }

    const move = this.game.move({
      from: bestMove.slice(0, 2) as Square,
      to: bestMove.slice(2, 4) as Square,
      promotion: bestMove[4] || 'q'
    });

    if (move) {
      this.afterMove(move.color as PlayerColor);
    } else {
      this.playFallbackMove();
    }

    this.isThinking.set(false);
  }

  private playFallbackMove(): void {
    const moves = this.game.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];

    this.clearAiTimeout();

    if (move) {
      this.game.move(move);
      this.afterMove(move.color as PlayerColor);
    }

    this.isThinking.set(false);
  }

  private afterMove(mover: PlayerColor): void {
    this.selectedSquare.set(null);
    this.syncGame();
    this.analyzeMove(mover, this.history().length - 1);
  }

  private analyzeMove(mover: PlayerColor, moveIndex: number): void {
    if (!this.analysisEngine || moveIndex < 0) {
      return;
    }

    this.latestAnalysisScore = undefined;
    this.analysisRequest = {
      id: ++this.analysisRequestId,
      mover,
      moveIndex
    };

    this.analysisEngine.postMessage(`position fen ${this.game.fen()}`);
    this.analysisEngine.postMessage('go depth 7');
  }

  private handleAnalysisMessage(message: string): void {
    const scoreMatch = message.match(/\bscore (cp|mate) (-?\d+)/);

    if (scoreMatch) {
      this.latestAnalysisScore = {
        type: scoreMatch[1] as Score['type'],
        value: Number(scoreMatch[2])
      };
      return;
    }

    if (!message.startsWith('bestmove') || !this.analysisRequest || !this.latestAnalysisScore) {
      return;
    }

    const { mover, moveIndex } = this.analysisRequest;
    const quality = this.describeMoveQuality(this.latestAnalysisScore);
    const qualities = [...this.moveQualities()];

    qualities[moveIndex] = quality;
    this.moveQualities.set(qualities);
    this.analysisRequest = undefined;
  }

  private describeMoveQuality(score: Score): string {
    if (score.type === 'mate') {
      const mateForMover = -score.value;
      return mateForMover > 0 ? `winning mate ${Math.abs(mateForMover)}` : `mate threat ${Math.abs(mateForMover)}`;
    }

    const centipawns = -score.value;
    const pawns = (centipawns / 100).toFixed(1);

    if (centipawns >= 250) {
      return `winning +${pawns}`;
    }

    if (centipawns >= 90) {
      return `strong +${pawns}`;
    }

    if (centipawns >= -50) {
      return `${centipawns >= 0 ? 'good' : 'fine'} ${centipawns >= 0 ? '+' : ''}${pawns}`;
    }

    if (centipawns >= -180) {
      return `risky ${pawns}`;
    }

    return `trouble ${pawns}`;
  }

  private clearAiTimeout(): void {
    if (this.aiTimeout) {
      globalThis.clearTimeout(this.aiTimeout);
      this.aiTimeout = undefined;
    }
  }

  private syncGame(): void {
    this.fen.set(this.game.fen());
    this.history.set(this.game.history());
  }
}
