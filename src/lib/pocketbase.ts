import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new PocketBase("https://postgres-gui.fly.dev/")

export const currentUser = writable(pb.authStore.model)