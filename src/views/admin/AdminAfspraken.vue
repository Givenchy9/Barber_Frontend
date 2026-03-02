<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Afspraken (Admin)</h1>

    <table class="w-full border">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Telefoon</th>
          <th>Datum</th>
          <th>Tijd</th>
          <th>Service</th>
          <th>Notities</th>
          <th>Acties</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.name }}</td>
          <td>{{ appointment.phone }}</td>
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.time }}</td>
          <td>{{ appointment.service }}</td>
          <td>{{ appointment.notes }}</td>
          <td class="space-x-2">
            <button @click="openEditModal(appointment)">✏️ Edit</button>
            <button @click="deleteAppointment(appointment.id)">🗑</button>
          </td>
        </tr>
      </tbody>

    </table>
    <!-- Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded w-96">
        <h2 class="text-xl font-bold mb-4">Afspraak bewerken</h2>

        <input v-model="selectedAppointment.name" placeholder="Naam" />
        <input v-model="selectedAppointment.phone" placeholder="Telefoon" />
        <input type="date" v-model="selectedAppointment.date" />
        <input type="time" v-model="selectedAppointment.time" />

        <select v-model="selectedAppointment.service">
          <option value="haar">Haar</option>
          <option value="baard">Baard</option>
          <option value="haar_baard">Haar & Baard</option>
        </select>

        <textarea v-model="selectedAppointment.notes" placeholder="Notities"></textarea>

        <div class="mt-4 flex justify-end space-x-2">
          <button @click="closeModal">Annuleren</button>
          <button @click="saveEdit">Opslaan 💾</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const appointments = ref([])
const showModal = ref(false)
const selectedAppointment = ref(null)

const fetchAppointments = async () => {
  const response = await fetch('http://localhost:8000/api/appointments')
  appointments.value = await response.json()
}

const openEditModal = (appointment) => {
  selectedAppointment.value = { ...appointment }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedAppointment.value = null
}

const saveEdit = async () => {
  await fetch(
    `http://localhost:8000/api/appointments/${selectedAppointment.value.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedAppointment.value)
    }
  )

  const index = appointments.value.findIndex(
    a => a.id === selectedAppointment.value.id
  )
  appointments.value[index] = { ...selectedAppointment.value }

  closeModal()
}

const deleteAppointment = async (id) => {
  if (!confirm('Weet je zeker?')) return

  await fetch(`http://localhost:8000/api/appointments/${id}`, {
    method: 'DELETE'
  })

  appointments.value = appointments.value.filter(a => a.id !== id)
}

onMounted(fetchAppointments)

</script>
