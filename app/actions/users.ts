'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'

// Helper to get authorized user
async function getUser() {
    const payload = await getPayload({ config })
    const result = await payload.auth({ headers: await headers() })
    return result.user
}

export async function updateProfile(data: { name?: string; phone?: string }) {
    const user = await getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const payload = await getPayload({ config })

    try {
        const result = await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                name: data.name,
                phone: data.phone,
            },
        })

        return { success: true, user: result }
    } catch (error) {
        console.error('Error updating profile:', error)
        return { success: false, error: 'Failed to update profile' }
    }
}

export async function changePassword(currentPassword: string, newPassword: string) {
    const user = await getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const payload = await getPayload({ config })

    try {
        // Verify current password by attempting login
        const loginResult = await payload.login({
            collection: 'users',
            data: {
                email: user.email,
                password: currentPassword,
            },
        })

        if (!loginResult.user) {
            return { success: false, error: 'Current password is incorrect' }
        }

        // Update password
        await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                password: newPassword,
            },
        })

        return { success: true }
    } catch (error) {
        console.error('Error changing password:', error)
        return { success: false, error: 'Failed to change password' }
    }
}
