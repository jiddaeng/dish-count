import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SettingPage.css'

function SettingPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [num, setNum] = useState(0)
    const [dishList, setDishList] = useState([])
    const [counts, setCounts] = useState([])

    const onChange = (event, index) => {
        const tempList = [...dishList]
        tempList[index] = event.target.value
        setDishList(tempList)
    }

    useEffect(() => {
        if (location.state?.dishList) {
            const tempList = location.state.dishList
            const tempCountList = location.state.counts

            setDishList(tempList)
            setNum(tempList.length)
            setCounts(tempCountList)
        }
    }, [location.state])

    const onClick = () => {
        const n = Number(num)

        const newDishList = Array.from({ length: n }, (_, i) => dishList[i] ?? '')
        const newCounts = Array.from({ length: n }, (_, i) => counts[i] ?? 0)

        setDishList(newDishList)
        setCounts(newCounts)
    }

    const goToMain = () => {
        navigate('/main', { state: { dishList, counts } })
    }

    return (
        <main className="setting-page">
            <section className="setting-page__panel">
                <div className="setting-page__hero">
                    <p className="setting-page__eyebrow">Dish Count</p>
                    <div className="setting-page__title-wrap">
                        <span className="setting-page__title-chip">Start Softly</span>
                        <h1 className="setting-page__title">
                            <span>카운트 항목</span>
                            <span>설정하기</span>
                        </h1>
                    </div>
                    <p className="setting-page__description">
                        먼저 항목 개수를 정하고, 각 버튼에 표시될 이름을 입력해 주세요.
                    </p>
                </div>

                <div className="setting-page__controls">
                    <label className="setting-page__field">
                        <span>항목 개수</span>
                        <input
                            value={num}
                            type="number"
                            min="0"
                            placeholder="개수를 입력하세요"
                            onChange={(event) => {
                                setNum(event.target.value)
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    onClick()
                                }
                            }}
                        />
                    </label>

                    <div className="setting-page__actions">
                        <button type="button" className="setting-page__button" onClick={onClick}>
                            입력칸 만들기
                        </button>
                        <button
                            type="button"
                            className="setting-page__button setting-page__button--primary"
                            onClick={goToMain}
                        >
                            카운트 시작
                        </button>
                    </div>
                </div>

                <div className="setting-page__list">
                    {dishList.map((item, index) => (
                        <label key={index} className="setting-page__item">
                            <span>{index + 1}번 항목</span>
                            <input
                                value={item}
                                placeholder={`항목 ${index + 1}`}
                                onChange={(event) => onChange(event, index)}
                            />
                        </label>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default SettingPage
