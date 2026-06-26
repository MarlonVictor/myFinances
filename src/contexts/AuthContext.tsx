import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, firebase } from '../services/firebase'


type UserProps = {
    id: string
    name: string
    avatar: string | null
}

type AuthContextData = {
    user: UserProps | undefined
    isAuthReady: boolean
    showSummary: boolean
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
    handleShowSummary: () => void
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const [isAuthReady, setIsAuthReady] = useState(false)
    const [showSummary, setShowSummary] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const { uid, displayName, photoURL } = firebaseUser
    
                if (!displayName) {
                    throw new Error('Missing information from Google Account.')
                }
    
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            } else {
                setUser(undefined)
            }

            setIsAuthReady(true)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { uid, displayName, photoURL } = result.user

            if (!displayName) {
                throw new Error('Missing information from Google Account.')
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    async function signOut() {
        await auth.signOut()
        setUser(undefined)
    }

    function handleShowSummary() {
        setShowSummary(!showSummary)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthReady,
                showSummary,
                signInWithGoogle,
                signOut,
                handleShowSummary
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}