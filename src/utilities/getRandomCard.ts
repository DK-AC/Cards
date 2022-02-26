import {CardType} from "../bll/reducers/cardReducer";

export const getRandomCard = (cards: CardType[]) => {
    const sum = cards.reduce(
        // @ts-ignore
        (acc, card) => acc + (6 - card.grade) * (6 - card.grade),
        0
    );
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            // @ts-ignore
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id};
        },
        {sum: 0, id: -1}
    );

    return cards[res.id + 1];
};