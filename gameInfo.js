export let score = 0;

export const updateScore = (add) => {
    score += add;
}

export const setScore = (what) => {
    score = what;
}