/**
 * The distance between two positions in 2-dimensional space
 * @param a
 * @param b
 */
export function distance (a, b) {
    return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
};