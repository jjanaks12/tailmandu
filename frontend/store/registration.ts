import { defineStore } from "pinia"

type Mode = "volunteer" | "runner"

export const useRegistrationStore = defineStore("registration", () => {
  const isLoading = ref(false)
  const okMsg = ref("")
  const errMsg = ref("") 

  const buildPersonal = (v: any) => ({
    first_name: v.first_name ?? null,
    middle_name: v.middle_name ?? null,
    last_name: v.last_name ?? null,
    email: v.email,
    phone_number: v.phone_number ?? null,
    date_of_birth: v.date_of_birth,
    country_id: v.country_id ?? null,
    gender_id: v.gender_id ?? null,
    size_id: v.size_id ?? null,
    age_category_id: v.age_category_id ?? null,
  })

  const submit = async (mode: Mode, values: any) => {
    okMsg.value = ""
    errMsg.value = ""
    isLoading.value = true
    try {
      if (mode === "volunteer") {
        const personal = buildPersonal(values) 
        //  await axios.post('/api/volunteer/register', personal)
        okMsg.value = `Registered as Volunteer (${personal.email})`
        return { personal }
      } else {
        const payload = {
          personal: buildPersonal(values),
          runner: {
            event_id: values.event_id,
            stage_id: values.stage_id,
          },
        } 
        //  await axios.post('/api/runner/register', payload)
        okMsg.value = `Registered as Runner (${payload.personal.email})`
        return payload
      }
    } catch (e: any) {
      errMsg.value = e?.data?.statusMessage || e?.message || "Registration failed"
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, okMsg, errMsg, submit }
})
