import { appState } from "../AppState.js";
import { saveState } from "../Utils/Store.js";
import { Job } from "../Models/Job.js";
import { SandboxServer } from "./AxiosService.js";
import { Pop } from "../Utils/Pop.js";

class JobsService {

  async editJob(formData) {
    const job = appState.activeJob
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData)
    console.log('update', res.data);
    const updatedJob = new Job(res.data)

    const index = appState.jobs.findIndex(j => j.id == job.id)
    appState.jobs.splice(index, 1, updatedJob)
    appState.emit('jobs')
  }

  setActiveJob(id) {
    const job = appState.jobs.find(j => j.id == id)
    if (!job) {
      throw new Error('that is a bad ID')
    }
    appState.activeJob = job
    console.log('active job', appState.activeJob)
  }

  async removeJob(id) {
    const yes = await Pop.confirm('Remove the job?')
    if (!yes) { return }
    await SandboxServer.delete(`/api/jobs/${id}`)
    appState.jobs = appState.jobs.filter(j => j.id != id)
  }

  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(j => new Job(j))
  }
  async addJob(formData) {
    const res = await SandboxServer.post('/api/jobs', formData)
    console.log('what jobs', res.data)
    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]
  }









}
export const jobsService = new JobsService()