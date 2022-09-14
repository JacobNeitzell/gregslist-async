import { appState } from "../AppState.js"
import { setHTML } from "../Utils/Writer.js"
import { getFormData } from "../utils/FormHandler.js"
import { jobsService } from "../Services/JobsService.js"
import { Pop } from "../Utils/Pop.js"
import { Job } from "../Models/Job.js"

function drawJobs() {
  let template = ''
  appState.jobs.forEach(job => template += job.JobCardTemplate)
  console.log("i am working", appState.jobs)

  setHTML('listings', template)
}


export class JobsController {
  constructor() {
    appState.on('jobs', drawJobs)
    console.log('the jobs controller')
    this.showJobs()
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error('[GetJobs]', error)
      Pop.error(error)
    }
  }

  showJobs() {
    this.getJobs()
    setHTML('forms', Job.getJobForm())
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)


      await jobsService.addJob(formData)

      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[Addjob]', error)
      Pop.error(error)
    }
  }
  async removeJob(id) {
    try {
      await jobsService.removeJob(id)
    } catch (error) {
      console.error('[Remove Job', error)
      Pop.error(error)
    }
  }
  addJob() {
    // @ts-ignore
    appState.activeJob = null
    const template = Job.getJobForm()
    setHTML('forms', template)
  }



  startEdit(id) {
    jobsService.setActiveJob(id)
    const editable = appState.activeJob
    const template = Job.getJobForm(editable)

    setHTML('forms', template)
  }












































}