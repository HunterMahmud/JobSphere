import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const newJobs = await request.json();

  const db = await connectDB();
  const postAJobCollection = db.collection("addedJobs");
  const companyCollection = db.collection("companyInfo");

  try {
    const result = await companyCollection.findOne({'contactInformation.email':newJobs?.email})


    if(!result?.companyInfo?.companyName || !result?.companyInfo?.address || !result?.contactInformation?.phone){
      return Response.json({message: 'Update company info'}, {status: 404})
    }
    const res = await postAJobCollection.insertOne({...newJobs, compnayInforamtion: result});
    return Response.json({ message: "job posted successfully",res }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong" }, { status: 400 });
  }
};


/*


this is company data sample for work on it.

{"companyInfo":{"companyName":"Tech Innovators Inc.","companyMission":"Pioneering Tomorrow's Technology","companyType":"Technology","logo":"https://i.ibb.co.com/tbTQy0f/Tech.jpg","address":"1234 Silicon Valley, San Francisco","city":"San Francisco","foundedYear":"2025","country":"Albania"},

"employmentInfo":{"companySize":"200-550 employees.","typesOfJobs":"Full-time,Part-time,Internship,Free."},

"contactInformation":{"email":"rir@gmail.com","phone":"+1 234 56","website":"https://www.techsolutions.com","socialLinks":{"linkedin":"https://www.linkedin.com/company/techsolutions","twitter":"https://twitter.com/techsolutions"}}}

*/