import { generateId } from "../Utils/generateId.js"


export class Job {

  /**
   * The data needed to make a car
   * @param {{company: string, jobTitle: string, hours: number, rate: number, description: string, id?:string}} data 
   */

  constructor(data) {
    this.id = data.id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description

  }

  get JobCardTemplate() {
    return /*html*/`
<div class= "col-md-4 col-lg-3 mb-3">
<div class= " card">
<div class="card-body">
<h5 class="text-uppercase">
${this.company} | ${this.jobTitle} </h5>
<p><strong>Hours:${this.hours} Rate:${this.rate}</strong></p>
<p>${this.description}</p>
          <button class="btn text-uppercase" onclick="app.jobsController.removeJob('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.StartEdit('${this.id}')">Edit</button>
</div>
</div>
</div>`

  }


  /** @param {Job}[editable] */
  static getJobForm(editable) {


    editable = editable || new Job({ company: '', jobTitle: '', description: '', hours: 0, rate: 0, })

    return /*html*/` 
<form onsubmit="app.jobsController.handleSubmit()">
<div class="form-floating mb-3">
<input type="text" class="form-control" name="company"
required minlenght = "3" maxLenght="20" value="${editable.company}"> 
<label for = "company">company</label>
</div>

<div class="form-floating mb-3">
<input type="text" class="form-control" name="jobTitle"
required minlenght = "3" maxLenght="20" value="${editable.jobTitle}"> 
<label for = "jobTitle">Job Title</label>
</div>


<div class="form-floating mb-3">
<input type="text" class="form-control" name="description"
required minlenght = "3" maxLenght="20" value="${editable.description}"> 
<label for = "description">Description</label>
</div>


<div class="form-floating mb-3">
<input type="text" class="form-control" name="hours"
required minlenght = "3" maxLenght="20" value="${editable.hours}"> 
<label for = "hours">Hours</label>
</div>



<div class="form-floating mb-3">
<input type="text" class="form-control" name="rate"
required minlenght = "3" maxLenght="20" value="${editable.rate}"> 
<label for = "rate">Rate</label>
</div>

<div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
        </div>
      </form>







`
  }

}
































