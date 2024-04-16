<script lang="ts">
	import { capacitorDataSource } from '$lib/datasource';
	import { UserEntity } from '$lib/entity/UserEntity';
	import { ADAPTER } from '$lib/env';
	import sqliteParams from '$lib/sqliteparams';
	import Chance from 'chance';
	import { onMount } from 'svelte';

	let message = 'Hello World!';
	let hasCapacitor = ADAPTER === 'capacitor';
	let queriedData: UserEntity[] = [];

	let loadingNewUser = false;
	async function getUserData() {
		const data = await capacitorDataSource.manager.count(UserEntity);
		const users = await capacitorDataSource.manager.find(UserEntity);
		queriedData = users;
		console.log('data', data);
		message = `There are ${data} users in the database`;

		loadingNewUser = false;
	}

	onMount(async () => {
		if (ADAPTER === 'capacitor') {
			await sqliteParams.connection.checkConnectionsConsistency().catch((e) => {
				console.log(e);
				return {};
			});

			await capacitorDataSource.initialize();
			if (capacitorDataSource.isInitialized) {
				// run the migrations
				await capacitorDataSource.runMigrations();
			}

			await getUserData();
		} else {
			message = 'Not currently in capacitor adapter mode';
		}
	});

	async function addRandomUser() {
		loadingNewUser = true;
		await capacitorDataSource.manager
			.createQueryBuilder()
			.insert()
			.into('user')
			.values({
				firstName: Chance().name(),
				lastName: Chance().name(),
				age: Chance().age()
			})
			.execute();

		await getUserData();
	}

	async function dropDb() {
		await capacitorDataSource.dropDatabase();
		location.reload();
	}
</script>

<h1>Welcome to SvelteKit</h1>
<h3>running in {ADAPTER} adapter mode</h3>

<p>
	{message}
</p>

{#if hasCapacitor}
	<!-- content here -->
	<button on:click={dropDb}> Drop Database </button>

	<button on:click={addRandomUser}> Add Random User </button>
{/if}

{#if loadingNewUser}
	<!-- content here -->
	Loading new user data!
{/if}
{#if queriedData}
	<ul>
		{#each queriedData as user}
			<li>{user.id} - {user.firstName} {user.lastName}, {user.age}</li>
		{/each}
	</ul>
{/if}
