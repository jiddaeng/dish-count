import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './MainPage.css'

function MainPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [dishList, setDishList] = useState(['접시', '컵', '숟가락', '포크'])
    const [counts, setCounts] = useState([0, 0, 0, 0])
    const [sign, setSign] = useState(true)
    const [halfPoint, setHalfPoint] = useState(false)
    const [activeButton, setActiveButton] = useState(null)

    useEffect(() => {
        if (location.state) {
            if (location.state.dishList) {
                const tempList = location.state.dishList
                const prevCounts = location.state.counts || []
                const newCounts = Array.from(
                    { length: tempList.length },
                    (_, index) => prevCounts[index] ?? 0,
                )

                setDishList(tempList)
                setCounts(newCounts)
            }

            if (location.state.sign != null) {
                setSign(location.state.sign)
            }

            if (location.state.halfPoint != null) {
                setHalfPoint(location.state.halfPoint)
            }
        }
    }, [location.state])

    const onClick = (index) => {
        const tempList = [...counts]

        if (halfPoint) {
            tempList[index] += sign ? 0.5 : -0.5
        } else {
            tempList[index] += sign ? 1 : -1
        }

        if (tempList[index] < 0) {
            tempList[index] = 0
        }

        setCounts(tempList)
        setActiveButton(index)
        setTimeout(() => setActiveButton(null), 150)
    }

    const goToSettings = () => {
        navigate('/settings', { state: { dishList, counts, sign, halfPoint } })
    }

    return (
        <main className="main-page">
            <section className="main-page__panel">
                <div className="main-page__header">
                    <div>
                        <p className="main-page__eyebrow">Dish Count</p>
                        <div className="main-page__title-wrap">
                            <span className="main-page__title-chip">Counting Flow</span>
                            <h1 className="main-page__title">
                                <span>메인</span>
                                <span>카운트</span>
                            </h1>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="main-page__gear-button"
                        onClick={goToSettings}
                        aria-label="설정 페이지 이동"
                    >
                        ⚙️
                    </button>
                </div>

                <div className="main-page__mode-card">
                    <span className="main-page__mode-label">현재 모드</span>
                    <strong>{sign ? '증가 +' : '감소 -'}</strong>
                    <strong>{halfPoint ? '0.5 단위' : '1 단위'}</strong>
                </div>

                <div className="main-page__count-list">
                    {dishList.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`main-page__count-button ${activeButton === index ? 'main-page__count-button--active' : ''}`}
                            onClick={() => onClick(index)}
                        >
                            <span className="main-page__count-name">{item || `항목 ${index + 1}`}</span>
                            <span className="main-page__count-value">{counts[index]}</span>
                        </button>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default MainPage
