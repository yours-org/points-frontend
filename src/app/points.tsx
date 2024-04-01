'use client'

import React from 'react'
import { HashPointsArtifact, deploy, mine, sync } from '@/contracts/contract'
import { Button } from '@/components/ui/button'

let init = false

export default function Points() {
	const [points, setPoints] = React.useState(0n)
	const [started, setStarted] = React.useState(false)
	const [instance, setInstance] = React.useState(null)

	React.useEffect(() => {
		async function run() {
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
