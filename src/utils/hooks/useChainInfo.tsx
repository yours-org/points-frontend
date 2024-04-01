import useLockHistory from '@/utils/hooks/useLockHistory'
import useSwr from 'swr'
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())
// @ts-ignore
const fetcherText = (...args) => fetch(...args).then((res) => res.text())

const bdiff = BigInt('0x00000000FFFF0000000000000000000000000000000000000000000000000000')

export default function useChainInfo() {
	const { data: lockHistoryData } = useLockHistory()
	const { data, isLoading } = useSwr(
		'https://api.whatsonchain.com/v1/bsv/main/chain/info',
		fetcher,
		{
			refreshInterval: 30000
		}
	)

	const { data: btcData } = useSwr('https://mempool.space/api/blocks/tip/hash', fetcherText)

	const tip = data?.blocks || 0
	const difficulty = data && btcData ? bdiff / BigInt('0x' + data?.bestblockhash) : 1n
	const btcDifficulty = btcData && data ? bdiff / BigInt('0x' + btcData) : 1n
	const historyTip = lockHistoryData ? parseInt(lockHistoryData?.slice(-1)?.[0]?.height, 10) : 0
	const lastProcessed = historyTip

	return {
		data,
		isLoading,
		lastProcessed,
		difficulty,
		btcDifficulty,
		difficultyRatio: (Number(difficulty) / Number(btcDifficulty)) * 100
	}
}
