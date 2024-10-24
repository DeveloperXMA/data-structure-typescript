import { expect, it, describe } from 'vitest';
import { MyCircularQueue } from '../circularQueue';

describe('MyCircularQueue', () => {
    it('should initialize an empty queue', () => {
        const queue = new MyCircularQueue(3);
        expect(queue.isEmpty()).toBe(true);
        expect(queue.isFull()).toBe(false);
        expect(queue.Front()).toBe(-1);
        expect(queue.Rear()).toBe(-1);
    });

    it('should perform enQueue operations correctly', () => {
        const queue = new MyCircularQueue(3);
        expect(queue.enQueue(1)).toBe(true); // 队列：[1]
        expect(queue.enQueue(2)).toBe(true); // 队列：[1, 2]
        expect(queue.enQueue(3)).toBe(true); // 队列：[1, 2, 3]
        expect(queue.enQueue(4)).toBe(false); // 队列已满，不能插入4
        expect(queue.isFull()).toBe(true);
        expect(queue.Rear()).toBe(3);
    });

    it('should perform deQueue operations correctly', () => {
        const queue = new MyCircularQueue(3);
        queue.enQueue(1);
        queue.enQueue(2);
        queue.enQueue(3);
        expect(queue.deQueue()).toBe(true); // 移除1，队列：[_, 2, 3]
        expect(queue.Front()).toBe(2);
        expect(queue.Rear()).toBe(3);
        expect(queue.size).toBe(2);
    });

    it('should handle wrap-around correctly', () => {
        const queue = new MyCircularQueue(3);
        expect(queue.enQueue(1)).toBe(true); // 队列：[1]
        expect(queue.enQueue(2)).toBe(true); // 队列：[1, 2]
        expect(queue.enQueue(3)).toBe(true); // 队列：[1, 2, 3]
        expect(queue.deQueue()).toBe(true);  // 移除1，队列：[_, 2, 3]
        expect(queue.enQueue(4)).toBe(true); // 队列：[4, 2, 3]，rear 应该环绕到索引0
        expect(queue.Rear()).toBe(4);
        expect(queue.Front()).toBe(2);
    });

    it('should return -1 when getting Front or Rear from an empty queue', () => {
        const queue = new MyCircularQueue(3);
        expect(queue.Front()).toBe(-1);
        expect(queue.Rear()).toBe(-1);
    });

    it('should correctly identify empty and full states', () => {
        const queue = new MyCircularQueue(2);
        expect(queue.isEmpty()).toBe(true);
        expect(queue.isFull()).toBe(false);
        queue.enQueue(1);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.isFull()).toBe(false);
        queue.enQueue(2);
        expect(queue.isFull()).toBe(true);
        queue.deQueue();
        expect(queue.isEmpty()).toBe(false);
        expect(queue.isFull()).toBe(false);
        queue.deQueue();
        expect(queue.isEmpty()).toBe(true);
    });

    it('should handle multiple wrap-around operations', () => {
        const queue = new MyCircularQueue(5);
        queue.enQueue(10);
        queue.enQueue(20);
        queue.enQueue(30);
        queue.enQueue(40);
        expect(queue.deQueue()).toBe(true); // 移除10
        expect(queue.deQueue()).toBe(true); // 移除20
        queue.enQueue(50);
        queue.enQueue(60);
        expect(queue.Rear()).toBe(60);
        expect(queue.Front()).toBe(30);
        expect(queue.enQueue(70)).toBe(true); // 队列已满
        expect(queue.isFull()).toBe(true);
        expect(queue.enQueue(80)).toBe(false); // 无法再插入
    });

    it('should maintain correct size after multiple operations', () => {
        const queue = new MyCircularQueue(3);
        expect(queue.size).toBe(0);
        queue.enQueue(1);
        expect(queue.size).toBe(1);
        queue.enQueue(2);
        expect(queue.size).toBe(2);
        queue.deQueue();
        expect(queue.size).toBe(1);
        queue.deQueue();
        expect(queue.size).toBe(0);
    });
});