type Point = { x: number; y: number };
type CursorPos = { curr: Point | null; prev: Point | null };

const lerp = (a: number, b: number, n: number): number => {
  return Math.round(a) === b ? b : (1 - n) * a + n * b;
};

const isSamePoint = (a: Point | null, b: Point | null): boolean => {
  if (!a || !b) return false;
  return a.x === b.x && a.y === b.y;
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

class Cursor {
  pos: CursorPos = { curr: null, prev: null };
  cursor!: HTMLDivElement;
  spot!: HTMLDivElement;
  scr!: HTMLStyleElement;
  private rafId: number | null = null;
  private reduced = prefersReducedMotion();

  constructor() {
    this.create();
    this.init();
    this.render();
  }

  move(left: number, top: number): void {
    this.cursor.style.left = `${left}px`;
    this.cursor.style.top = `${top}px`;
  }

  create(): void {
    if (!this.cursor) {
      this.cursor = document.createElement('div');
      this.cursor.id = 'cursor';
      document.body.appendChild(this.cursor);
    }

    // 跟手的琥珀聚光灯，随指针位置更新 CSS 变量
    if (!this.spot && !this.reduced) {
      this.spot = document.createElement('div');
      this.spot.id = 'cursor-spot';
      document.body.appendChild(this.spot);
    }

    if (!this.scr) {
      this.scr = document.createElement('style');
      this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='%238b6fd6' /></svg>") 4 4, auto !important}`;
      document.body.appendChild(this.scr);
    }
  }

  init(): void {
    document.addEventListener('mousemove', this.onMouseMove, { passive: true });
    document.addEventListener('mouseenter', this.onMouseEnter);
    document.addEventListener('mouseleave', this.onMouseLeave);
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mouseover', this.onMouseOver);
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.cursor.classList.add('visible');
    this.spot?.classList.add('visible');

    if (this.spot) {
      document.documentElement.style.setProperty('--spot-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--spot-y', `${e.clientY}px`);
    }

    if (this.reduced) {
      this.move(e.clientX, e.clientY);
      return;
    }

    if (!this.pos.curr) {
      this.move(e.clientX, e.clientY);
    }

    this.pos.curr = { x: e.clientX, y: e.clientY };

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.render);
    }
  };

  private onMouseOver = (e: MouseEvent): void => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('a, button, [data-cursor="link"]')) {
      this.cursor.classList.add('link');
    } else {
      this.cursor.classList.remove('link');
    }
  };

  private onMouseEnter = (): void => {
    this.cursor.classList.add('visible');
    this.spot?.classList.add('visible');
  };

  private onMouseLeave = (): void => {
    this.cursor.classList.remove('visible');
    this.spot?.classList.remove('visible');
  };

  private onMouseDown = (): void => {
    this.cursor.classList.add('active');
  };

  private onMouseUp = (): void => {
    this.cursor.classList.remove('active');
  };

  private render = (): void => {
    if (!this.pos.curr) {
      this.rafId = null;
      return;
    }

    if (this.pos.prev) {
      this.pos.prev.x = lerp(this.pos.prev.x, this.pos.curr.x, 0.35);
      this.pos.prev.y = lerp(this.pos.prev.y, this.pos.curr.y, 0.35);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = { ...this.pos.curr };
    }

    if (!isSamePoint(this.pos.curr, this.pos.prev)) {
      this.rafId = requestAnimationFrame(this.render);
    } else {
      this.rafId = null;
    }
  };

  destroy(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseenter', this.onMouseEnter);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mouseover', this.onMouseOver);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.cursor?.remove();
    this.spot?.remove();
    this.scr?.remove();
  }
}

let mainCursor: Cursor | null = null;

const cursorInit = (): Cursor => {
  if (!mainCursor) {
    mainCursor = new Cursor();
  }
  return mainCursor;
};

export default cursorInit;
