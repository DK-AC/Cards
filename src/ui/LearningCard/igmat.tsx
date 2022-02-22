import {CardType} from "../../bll/reducers/cardReducer";
import {useState} from "react";
import {useParams} from "react-router-dom";

const grades = [1,2,3,4,5];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useSelector((store: AppStoreType) => store.cards);
    const {id} = useParams();

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    });

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCards(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }

    DEV_VERSION && console.log('render LearnPage');
    return (
        <div>
            LearnPage

            <div>{card.question}</div>
            <div>
                <ButtonNya onClick={() => setIsChecked(true)}>check</ButtonNya>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <ButtonNya key={'grade-' + i} onClick={() => {
                        }}>{g}</ButtonNya>
                    ))}

                    <div><ButtonNya onClick={onNext}>next</ButtonNya></div>
                </>
            )}
        </div>
    );
};

export default LearnPage;