// //-------------------------------------------``** GET ALL PLANS **`` //-------------------------------------------

// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans`; //

// import { getData } from ".";

// const getAllPlans = async () => {
//   try {
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
// // getAllPlans()
// //------------------------------------------- ``** GET A SINGE PLAN BY ID **``  //-------------------------------------------

// const getSinglePlan = async (planId) => {
//   try {
//     const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/plan/${planId}`;
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching a single plan:", error);
//   }
// };

// getSinglePlan("oakland-cultural-highlights");
// //------------------------------------------- ``** GET PLANS BY USER **``  //-------------------------------------------
// const getPlansByUserId = async (userId) => {
//   try {
//     const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/user/${userId}`;
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching user's plans:", error);
//   }
// };

// getPlansByUserId("john - smith");

//  //------------------------------------------- ``** GET PLANS BY CATEGORY **``  //-------------------------------------------

// const getPlansByCategory = async (categoryId) => {
//   try {
//     const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/category/${categoryId}`;
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching data by category:", error);
//   }
// };

// // getPlansByCategory("academic-and-cultural-tour");

// export { getAllPlans, getPlansByCategory, getSinglePlan, getPlansByUserId };
