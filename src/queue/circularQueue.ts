export class MyCircularQueue {
    public size: number;       // 当前队列中元素的数量
    private capacity: number;   // 队列的最大容量
    private queue: number | undefined [];    // 用于存储队列元素的数组
    private front: number;      // 指向队头元素的索引
    private rear: number;       // 指向队尾元素的索引

    constructor(k: number) {
        this.size = 0;                     // 初始化队列大小为0
        this.capacity = k;                 // 设置队列的容量为k
        this.queue = new Array(k).fill(undefined);         // 初始化存储队列元素的数组
        this.front = -1;                   // 队列为空时，front为-1
        this.rear = -1;                    // 队列为空时，rear为-1
    }

    /**
     * 将元素插入队列尾部。如果成功插入，返回true；否则，返回false。
     * @param value 要插入的元素
     * @returns boolean 表示插入操作是否成功
     */
    enQueue(value: number): boolean {
        // 检查队列是否已满
        if (this.isFull()) return false;

        // 如果队列为空，插入第一个元素时，需要更新front指针
        if (this.isEmpty()) {
            this.front = 0;
        }

        // 计算新的rear位置，使用取模实现循环特性
        this.rear = (this.rear + 1) % this.capacity;

        // 在rear位置插入新元素
        this.queue[this.rear] = value;

        // 更新队列中元素的数量
        this.size++;

        return true;
    }

    /**
     * 从队列头部删除元素。如果成功删除，返回true；否则，返回false。
     * @returns boolean 表示删除操作是否成功
     */
    deQueue(): boolean {
        // 检查队列是否为空
        if (this.isEmpty()) return false;

        // 删除队头元素（逻辑上删除，实际数据仍在数组中）
        this.queue[this.front] = undefined;

        // 如果队列中只有一个元素，删除后需要重置front和rear指针
        if (this.size === 1) {
            this.front = -1;
            this.rear = -1;
        } else {
            // 更新front指针，指向下一个元素
            this.front = (this.front + 1) % this.capacity;
        }

        // 更新队列中元素的数量
        this.size--;

        return true;
    }

    /**
     * 获取队头元素的值。如果队列为空，返回-1。
     * @returns number 队头元素的值或-1
     */
    Front(): number {
        // 检查队列是否为空
        if (this.isEmpty()) return -1;

        // 返回队头元素的值
        return this.queue[this.front];
    }

    /**
     * 获取队尾元素的值。如果队列为空，返回-1。
     * @returns number 队尾元素的值或-1
     */
    Rear(): number {
        // 检查队列是否为空
        if (this.isEmpty()) return -1;

        // 返回队尾元素的值
        return this.queue[this.rear];
    }

    /**
     * 检查队列是否为空。
     * @returns boolean 队列为空返回true，否则返回false
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * 检查队列是否已满。
     * @returns boolean 队列已满返回true，否则返回false
     */
    isFull(): boolean {
        return this.size === this.capacity;
    }
}

/**
 * 使用示例：
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
