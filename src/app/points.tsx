'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

let init = false

export default function Points() {
	const [points, setPoints] = React.useState(0n)
	const [started, setStarted] = React.useState(false)
	const [instance, setInstance] = React.useState(null)

	React.useEffect(() => {
		async function run() {
			const { deploy, sync } = await import('@/contracts/contract')

			if (typeof window !== 'undefined' && !init) {
				init = true
				if (!localStorage.getItem('point-contract')) {
					await deploy()
				}

				const instance = await sync()
				setInstance(instance)
				setPoints(instance.points)
			}
		}

		run()
	}, [])

	const handleStart = React.useCallback(async () => {
		const { mine } = await import('@/contracts/contract')
		setStarted(true)

		let i = instance

		while (true) {
			try {
				i = await mine(i)
				setInstance(i)
			} catch (e) {
				console.log('ERROR', e)
			}
		}

		setStarted(false)
	}, [instance])

	return (
		<>
			<p className="text-4xl font-semibold">{instance?.points?.toString()}</p>
			<p className="text-md text-muted-foreground">points</p>
			{!started && (
				<Button disabled={started} onClick={handleStart}>
					Start
				</Button>
			)}
		</>
	)
}
