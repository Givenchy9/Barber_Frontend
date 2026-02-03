<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center">Maak een afspraak</h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Naam -->
      <div>
        <label class="block text-sm font-medium mb-1">Naam</label>
        <input v-model="form.name" type="text" placeholder="Jouw naam"
          class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-black" required />
      </div>

      <!-- Telefoon -->
      <div>
        <label class="block text-sm font-medium mb-1">Telefoonnummer</label>
        <input v-model="form.phone" type="tel" placeholder="06 12345678"
          class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-black" required />
      </div>

      <!-- Datum & tijd -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Datum</label>
          <input v-model="form.date" type="date"
            class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-black" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Tijd</label>
          <input v-model="form.time" type="time"
            class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-black" required />
        </div>
      </div>

      <!-- Behandeling -->
      <div>
        <label class="block text-sm font-medium mb-1">Behandeling</label>
        <select v-model="form.service" class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-black"
          required>
          <option disabled value="">Kies een behandeling</option>
          <option value="haar">Haar</option>
          <option value="baard">Baard</option>
          <option value="haar_baard">Haar & Baard</option>
        </select>
      </div>

      <!-- Opmerking -->
      <div>
        <label class="block text-sm font-medium mb-1">Opmerkingen</label>
        <textarea v-model="form.notes" rows="3" placeholder="Extra wensen..."
          class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-black"></textarea>
      </div>

      <!-- Submit -->
      <button type="submit"
        class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
        Afspraak maken
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  date: '',
  time: '',
  service: '',
  notes: ''
})

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Er is iets misgegaan.')
    }

    const data = await response.json()
    alert(`Afspraak succesvol gemaakt voor ${data.appointment.name} ✂️`)

    // Form reset
    form.name = ''
    form.phone = ''
    form.date = ''
    form.time = ''
    form.service = ''
    form.notes = ''

  } catch (error) {
    alert(`Fout: ${error.message}`)
    console.error(error)
  }
}
</script>
