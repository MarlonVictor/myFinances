import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, firebase } from '../services/firebase'


type UserProps = {
    id: string
    name: string
    avatar: string | null
}

type AuthContextData = {
    user: UserProps | undefined
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
    const [showSummary, setShowSummary] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { uid, displayName, photoURL } = user
    
                if (!displayName) {
                    throw new Error('Missing information from Google Account.')
                }
    
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
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