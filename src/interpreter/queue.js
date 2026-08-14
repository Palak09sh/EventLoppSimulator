/**
 * Creates a generic queue. If a compare function is given, the queue
 * stays sorted after every insert (effectively a priority queue) -
 * otherwise it behaves as plain FIFO.
 * @param {*} compare [compare] - optional comparator, same contract as Array.sort.
 * @returns {{enqueue: Function, dequeue: Function, peek: Function, isEmpty: Function}}
 */

export function createQueue(compare) {
  const queue = [];
  return {
    enqueue(task) {
      queue.push(task);
      //Re-sort on every insert so priority order is maintained
      // (e.g. macrotasks staying ordered by delay)
      if (compare) {
        queue.sort(compare)
      }

    },
    // Remove and returns the front of the queue.
    dequeue() {
      return queue.shift();
    },
    // Returns the front of the queue without removing it.
    peek() {
      return queue[0];
    },
    isEmpty() {
      return queue.length === 0;
    },
  };
}
