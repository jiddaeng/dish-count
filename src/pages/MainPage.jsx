import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './MainPage.css'

function MainPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [dishList, setDishList] = useState([])
    const [counts, setCounts] = useState([])
    const [sign, setSign] = useState(true)
    const [halfPoint, setHalfPoint] = useState(false)
    const [activeButton, setActiveButton] = useState(null)

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

        // 클릭 피드백
        setActiveButton(index)
        setTimeout(() => setActiveButton(null), 150)
    }

    const toZero = () => {
        const isConfirmed = confirm('모든 카운트를 초기화할까요?')

        if (isConfirmed) {
            setCounts(Array.from({ length: counts.length }, () => 0))
        }
    }

    const saveResult = () => {
        const text = dishList
            .map((item, index) => `"${item}" : "${counts[index]}"`)
            .join('\n')

        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const date = String(now.getDate()).padStart(2, '0')
        const hour = String(now.getHours()).padStart(2, '0')
        const minute = String(now.getMinutes()).padStart(2, '0')
        const fileName = `${year}${month}${date}_${hour}-${minute}_집계결과.txt`

        const blob = new Blob([text], {
            type: 'text/plain;charset=utf-8',
        })

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    useEffect(() => {
        if (location.state?.dishList) {
            const tempList = location.state.dishList
            const prevCounts = location.state?.counts || []
            const newCounts = Array.from(
                { length: tempList.length },
                (_, index) => prevCounts[index] ?? 0,
            )

            setDishList(tempList)
            setCounts(newCounts)
        }
    }, [location.state])

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
                        <p className="main-page__description">
                            버튼을 눌러 항목별 수량을 빠르게 집계해보세요.
                        </p>
                    </div>
                    <div className="main-page__mode-card">
                        <span className="main-page__mode-label">현재 모드</span>
                        <strong>{sign ? '증가 +' : '감소 -'}</strong>
                        <strong>{halfPoint ? '0.5 단위' : '1 단위'}</strong>
                    </div>
                </div>

                <div className="main-page__toolbar">
                    <button
                        type="button"
                        className="main-page__action main-page__action--ghost"
                        onClick={() => navigate('/', { state: { dishList, counts } })}
                    >
                        설정으로
                    </button>
                    <button
                        type="button"
                        className="main-page__action"
                        onClick={toZero}
                    >
                        초기화
                    </button>
                    <button
                        type="button"
                        className="main-page__action"
                        onClick={saveResult}
                    >
                        결과 저장
                    </button>
                    <button
                        type="button"
                        className="main-page__action main-page__action--primary"
                        onClick={() => setSign((prev) => !prev)}
                    >
                        +/- 전환
                    </button>
                    <button
                        type="button"
                        className="main-page__action main-page__action--primary"
                        onClick={() => setHalfPoint((prev) => !prev)}
                    >
                        0.5 모드
                    </button>
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
