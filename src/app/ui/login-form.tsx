'use client'
import React, { useState, useActionState } from 'react';
import Image from 'next/image';
import './login-form.scss';
import { authenticate } from '../lib/actions';
import { useSearchParams } from 'next/navigation';
const LoginForm = () => {
        const [rememberMe, setRememberMe] = useState(false);
         const searchParams = useSearchParams();
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
        const [errorMessage, formAction, isPending] = useActionState(
            authenticate,
            undefined,
        );
    return (
        <div className="loginPage">
            <div className="loginContainer">
                <div className="loginBox">
                    {/* 로고 영역 */}
                    <div className="logoSection">
                        <Image
                            src="/images/stargrapher-1.png"
                            alt="Star Grapher"
                            width={180}
                            height={80}
                            className="logo"
                        />
                        <p className="welcomeText">stargrapher-dashboard</p>
                    </div>

                    {/* 로그인 폼 */}
                    <form className="loginForm" action={formAction}>
                        <div className="inputGroup">
                            <label htmlFor="email">이메일</label>
                            <div className="inputWrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    placeholder="이메일을 입력하세요"
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="password">비밀번호</label>
                            <div className="inputWrapper">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                />
                            </div>
                        </div>

                        <div className="optionsRow">
                            <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                로그인 상태 유지
                            </label>
                            <a href="#" className="forgotPassword">비밀번호 찾기</a>
                        </div>
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        <button type="submit" className="loginBtn">
                            로그인
                        </button>
                    </form>

                    {/* 하단 링크 */}
                    {/* <div className="bottomLinks">
                               <p>계정이 없으신가요? <a href="#">회원가입</a></p>
                           </div> */}
                </div>
            </div>
            {errorMessage && (
                <>
                    <p>{errorMessage}</p>
                </>
            )}
        </div>
    );
};

export default LoginForm;