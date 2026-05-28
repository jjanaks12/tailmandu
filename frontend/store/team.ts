import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TeamMember } from '~/lib/types'
import { useAxios } from '~/services/axios'

export const useTeamStore = defineStore('team', () => {
    const teams = ref<TeamMember[]>([])
    const isLoading = ref(false)
    const { axios } = useAxios()

    const fetchTeams = async () => {
        isLoading.value = true
        try {
            const { data } = await axios.get('/teams')
            teams.value = data
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    const fetchPublicTeams = async () => {
        isLoading.value = true
        try {
            const { data } = await axios.get('/teams/public')
            teams.value = data
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    const createTeam = async (payload: any) => {
        const { data } = await axios.post('/teams', payload)
        return data
    }

    const updateTeam = async (id: string, payload: any) => {
        const { data } = await axios.put(`/teams/${id}`, payload)
        return data
    }

    const deleteTeam = async (id: string) => {
        await axios.delete(`/teams/${id}`)
    }

    return {
        teams,
        isLoading,
        fetchTeams,
        fetchPublicTeams,
        createTeam,
        updateTeam,
        deleteTeam
    }
})
