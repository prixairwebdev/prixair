import nextEnv from '@next/env'
const { loadEnvConfig } = nextEnv
import { getPayload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

loadEnvConfig(path.resolve(__dirname, '../'))

const check = async () => {
    const { default: configPromise } = await import('../payload.config.js')
    const payload = await getPayload({ config: configPromise })

    const stores = await payload.find({
        collection: 'stores' as any,
        where: { slug: { equals: 'buka' } },
    })

    console.log('Buka Store:', JSON.stringify(stores.docs, null, 2))

    const products = await payload.find({
        collection: 'products' as any,
        where: { store: { equals: stores.docs[0]?.id } },
    })
    console.log('Buka Products Count:', products.docs.length)

    process.exit(0)
}

check().catch(err => {
    console.error(err)
    process.exit(1)
})
