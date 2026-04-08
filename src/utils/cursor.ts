let mainCursor: Cursor | null = null;

type Point = {
  x: number;
  y: number;
};

type CursorPos = {
  curr: Point | null;
  prev: Point | null;
};

const lerp = (a: number, b: number, n: number): number => {
  return Math.round(a) === b ? b : (1 - n) * a + n * b;
};

const getStyle = (el: HTMLElement, attr: string): string => {
  try {
    return window.getComputedStyle(el)[attr as any];
  } catch (e) {
    console.error(e);
    return "";
  }
};

// 👉 替代 lodash isEqual（更轻量）
const isSamePoint = (a: Point | null, b: Point | null): boolean => {
  if (!a || !b) return false;
  return a.x === b.x && a.y === b.y;
};

export const cursorInit = (): Cursor => {
  if (!mainCursor) {
    mainCursor = new Cursor();
  }
  return mainCursor;
};

class Cursor {
  pos: CursorPos = {
    curr: null,
    prev: null,
  };

  pt: string[] = [];
  cursor!: HTMLDivElement;
  scr!: HTMLStyleElement;

  private rafId: number | null = null;

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
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("xs-hidden", "hidden");
      document.body.appendChild(this.cursor);
    }

    const elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      if (getStyle(el, "cursor") === "pointer") {
        this.pt.push(el.outerHTML);
      }
    }

    this.scr = document.createElement("style");
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>") 4 4, auto !important}`;
    document.body.appendChild(this.scr);
  }

  refresh(): void {
    this.scr?.remove();
    this.cursor.classList.remove("active");

    this.pos = { curr: null, prev: null };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init(): void {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseenter", this.onMouseEnter);
    document.addEventListener("mouseleave", this.onMouseLeave);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  private onMouseMove = (e: MouseEvent): void => {
    if (!this.pos.curr) {
      this.move(e.clientX - 8, e.clientY - 8);
    }

    this.pos.curr = {
      x: e.clientX - 8,
      y: e.clientY - 8,
    };

    this.cursor.classList.remove("hidden");

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.render);
    }
  };

  private onMouseEnter = (): void => {
    this.cursor.classList.remove("hidden");
  };

  private onMouseLeave = (): void => {
    this.cursor.classList.add("hidden");
  };

  private onMouseDown = (): void => {
    this.cursor.classList.add("active");
  };

  private onMouseUp = (): void => {
    this.cursor.classList.remove("active");
  };

  render = (): void => {
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

  // 👉 生产级必须有：销毁
  destroy(): void {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseenter", this.onMouseEnter);
    document.removeEventListener("mouseleave", this.onMouseLeave);
    document.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mouseup", this.onMouseUp);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.cursor?.remove();
    this.scr?.remove();
    mainCursor = null;
  }
}

export default cursorInit;