<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import DeparturesList from '../../../components/DeparturesList.svelte';
	import { fetchStopDepartures } from '../../../util/fetch';
	import type { PageData } from './$types';
	import { REFETCH_INTERVAL_MS } from '../../../data/constants';

	export let data: PageData;
	$: stopData = createQuery({
		queryKey: ['stop', data.stopId],
		refetchInterval: REFETCH_INTERVAL_MS,
		queryFn: async () => await fetchStopDepartures({ stopId: [data.stopId] }),
		// structuralSharing(oldData, newData) {
		// 	return { ...oldData?.references, ...newData };
		// },
		cacheTime: 0
		// enabled: false
	});
</script>

<div
	class="flex sm:h-[calc(100vh-2.5rem)] w-full flex-col gap-2 sm:pr-4 pt-4 sm:w-80 sm:overflow-auto"
>
	<div class="flex gap-2 dark:text-slate-100 justify-between pb-2">
		<h1 class="text-lg self-baseline">
			{$stopData.data?.references?.stops?.[data.stopId]?.name ?? 'Loading...'}
		</h1>
		<div class="flex items-center">
			<button class="px-2" on:click={async () => await $stopData.refetch()}
				><span class="material-symbols-outlined text-base">
					{$stopData.isFetching ? 'autorenew' : 'refresh'}
				</span>
			</button>
			<a href="/" class="px-2"><span class="material-symbols-outlined text-base"> close </span></a>
		</div>
	</div>
	{#if $stopData.isSuccess}
		<DeparturesList
			departures={$stopData.data?.entry?.stopTimes}
			references={$stopData.data?.references}
			expandable={true}
		/>
	{:else if $stopData.isError}
		<div class="text-red-500">{$stopData.error}</div>
	{/if}
</div>
