import { describe, it, expect } from 'vitest';
import { PriorityQueue } from './priorityQueue';

describe('PriorityQueue', () => {
  const compareNumbers = (a: number, b: number) => a - b;

  it('should initialize an empty priority queue', () => {
    const pq = new PriorityQueue<number>(compareNumbers);
    expect(pq.size()).toBe(0);
    expect(pq.isEmpty()).toBe(true);
  });

  it('should add elements to the priority queue', () => {
    const pq = new PriorityQueue<number>(compareNumbers);
    pq.push(5);
    pq.push(1);
    pq.push(3);
    expect(pq.size()).toBe(3);
    expect(pq.peek()).toBe(1);
  });

  it('should remove elements in priority order', () => {
    const pq = new PriorityQueue<number>(compareNumbers);
    pq.push(5);
    pq.push(1);
    pq.push(3);
    expect(pq.pop()).toBe(1);
    expect(pq.pop()).toBe(3);
    expect(pq.pop()).toBe(5);
    expect(pq.pop()).toBeUndefined();
  });

  it('should update an element and maintain heap property', () => {
    const pq = new PriorityQueue<number>(compareNumbers);
    pq.push(5);
    pq.push(1);
    pq.push(3);
    pq.update(3, 0);
    expect(pq.pop()).toBe(0);
    expect(pq.pop()).toBe(1);
    expect(pq.pop()).toBe(5);
  });

  it('should remove an element and maintain heap property', () => {
    const pq = new PriorityQueue<number>(compareNumbers);
    pq.push(5);
    pq.push(1);
    pq.push(3);
    pq.remove(1);
    expect(pq.pop()).toBe(3);
    expect(pq.pop()).toBe(5);
    expect(pq.pop()).toBeUndefined();
  });

  it('should throw an error when updating a non-existent element', () => {
    const pq = new PriorityQueue<number>(compareNumbers);
    pq.push(5);
    expect(() => pq.update(10, 1)).toThrow('item not found');
  });

  it('should throw an error when removing a non-existent element', () => {
    const pq = new PriorityQueue<number>(compareNumbers);
    pq.push(5);
    expect(() => pq.remove(10)).toThrow('item not found');
  });
});