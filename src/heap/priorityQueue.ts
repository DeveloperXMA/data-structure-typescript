export class PriorityQueue<T> {
  private heap: T[];

  constructor(private compare: (a: T, b: T) => number) {
    this.heap = [];
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private left(i: number): number {
    return 2 * i + 1;
  }

  private right(i: number): number {
    return 2 * i + 2;
  }

  private heapifyUp(index: number): void {
   while (index > 0 && this.compare(this.heap[index], this.heap[this.parent(index)]) < 0) {
    this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  private heapifyDown(index: number): void {
    const length = this.heap.length;

    while (this.left(index) < length) {
      let smallest = this.left(index);
      const rightIndex = this.right(index);
      if (rightIndex < length && this.compare(this.heap[rightIndex], this.heap[smallest]) < 0) {
        smallest = rightIndex;
      }
      if (this.compare(this.heap[index], this.heap[smallest]) < 0) {
        break;
      }
      this.swap(index, smallest);
      index = smallest;
    }
  }

  public push(item: T): void {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  public pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
    this.heapifyDown(0);
    return root;
  }

  public peek(): T | undefined {
    return this.heap[0];
  }

  public size(): number {
    return this.heap.length;
  }

  public updateAtIndex(index: number, newItem: T): void {
    if (index < 0 || index >= this.heap.length) {
      throw new Error('index out of bounds');
    }
    this.heap[index] = newItem;
    if (this.compare(newItem, this.heap[this.parent(index)]) < 0) {
      this.heapifyUp(index);
    } else {
      this.heapifyDown(index);
    }
  }

  public update(item: T, newItem: T): void {
    const index = this.heap.indexOf(item);
    if (index === -1) {
      throw new Error('item not found');
    }
    this.updateAtIndex(index, newItem);
  }

  public remove(item: T): void {
    const index = this.heap.indexOf(item);
    if (index === -1) {
      throw new Error('item not found');
    }
    this.removeAtIndex(index);
  }

  private removeAtIndex(index: number): void {
    if (index < 0 || index >= this.heap.length) {
      throw new Error('index out of bounds');
    }
    if (index === this.heap.length - 1) {
      this.heap.pop();
    } else {
      this.heap[index] = this.heap.pop() as T;
      const parentIndex = this.parent(index);
      if (index > 0 && this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
        this.heapifyUp(index);
      } else {
        this.heapifyDown(index);
      }
    }
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public heapify(array: T[]): void {
    this.heap = array;
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}
