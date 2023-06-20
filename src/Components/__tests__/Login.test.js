import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Login } from '../Login'
import { auth } from '../../Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'

test('renders login component', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
    const loginElement = screen.getByTestId('login-1')
    expect(loginElement).toBeInTheDocument();

})

test('login with correct credentials works', async () => {
    const user = await signInWithEmailAndPassword(auth, "adit.desai@nuv.ac.in", "123456")
    expect(user).toBeTruthy()
})

test('login with incorrect credentials throws error', async () => {
    const possibleErrors = [
        'FirebaseError: Firebase: Error (auth/user-not-found).',
        'FirebaseError: Firebase: Error (auth/wrong-password).'
    ]
    let error = ''
    try {
        const user = await signInWithEmailAndPassword(auth, "adit.desai@nuv.ac.in", "12345")
    }
    catch (err) {
        error = err.toString()
    }

    expect(possibleErrors).toContain(error)
})