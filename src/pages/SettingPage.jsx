import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SettingPage.css'

function SettingPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [dishList, setDishList] = useState(['접시', '컵', '숟가락', '포크'])
    const [counts, setCounts] = useState([0, 0, 0, 0])
    const [sign, setSign] = useState(true)
    const [halfPoint, setHalfPoint] = useState(false)

    useEffect(() => {
        if (location.state) {
            if (location.state.dishList) {
                setDishList(location.state.dishList)
            }

            if (location.state.counts) {
                setCounts(location.state.counts)
            }

            if (location.state.sign != null) {
                setSign(location.state.sign)
            }

            if (location.state.halfPoint != null) {
                setHalfPoint(location.state.halfPoint)
            }
        }
    }, [location.state])

    const toggleSign = () => {
        setSign((prev) => !prev)
    }

    const toggleHalfPoint = () => {
        setHalfPoint((prev) => !prev)
    }

    const resetCounts = () => {
        setCounts(Array.from({ length: counts.length }, () => 0))
    }

    const goBackToMain = () => {
        navigate('/', { state: { dishList, counts, sign, halfPoint } })
    }

    return (
        <main className="setting-page">
            <section className="setting-page__panel setting-page__panel--settings">
                <div className="setting-page__hero">
                    <p className="setting-page__eyebrow">Dish Count</p>
                    <div className="setting-page__title-wrap">
                        <span className="setting-page__title-chip">Settings</span>
                        <h1 className="setting-page__title">
                            <span>설정</span>
                            <span>페이지</span>
                        </h1>
                    </div>
                    <p className="setting-page__description">
                        화면 전환 없이 모드를 바꾸고, 전체 카운트를 초기화할 수 있습니다.
                    </p>
                </div>

                <div className="setting-page__mode-card">
                    <span className="setting-page__mode-label">현재 모드</span>
                    <strong>{sign ? '증가 +' : '감소 -'}</strong>
                    <strong>{halfPoint ? '0.5 단위' : '1 단위'}</strong>
                </div>

                <div className="setting-page__actions setting-page__actions--settings">
                    <button type="button" className="setting-page__button setting-page__button--primary" onClick={toggleSign}>
                        +/- 전환
                    </button>
                    <button type="button" className="setting-page__button setting-page__button--primary" onClick={toggleHalfPoint}>
                        0.5 모드
                    </button>
                    <button type="button" className="setting-page__button" onClick={resetCounts}>
                        초기화
                    </button>
                </div>

                <div className="setting-page__footer">
                    <button type="button" className="setting-page__button setting-page__button--secondary" onClick={goBackToMain}>
                        메인으로 돌아가기
                    </button>
                </div>
            </section>
        </main>
    )
}

export default SettingPage
