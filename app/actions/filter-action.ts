"use server";

import { fetchFilteredData, getFilteredData } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function filterAction(formData: FormData) {
  let params = "";

  const requisitioner = formData.get("requisitioner")?.toString();
  const department = formData.get("department")?.toString();
  const position = formData.get("position")?.toString();
  const assign_to = formData.get("assignTo")?.toString();

  if (requisitioner && requisitioner !== null) {
    // params += `requisitioner=${requisitioner}`;
    if (params && params.length > 0) {
      params += `&requisitioner=${requisitioner}`;
    } else {
      params += `requisitioner=${requisitioner}`;
    }
  }

  if (department && department !== null) {
    if (params && params.length > 0) {
      params += `&department=${department}`;
    } else {
      params += `department=${department}`;
    }
  }

  if (position && position !== null) {
    if (params && params.length > 0) {
      params += `&position=${position}`;
    } else {
      params += `position=${position}`;
    }
  }

  if (assign_to && assign_to !== null) {
    if (params && params.length > 0) {
      params += `&assign_to=${assign_to}`;
    } else {
      params += `assign_to=${assign_to}`;
    }
  }

  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("http://10.10.1.120:3000/login");
  }

  console.log(`this is the params ::: ${params}`);

  const filteredData = await fetchFilteredData(token, params);

  return filteredData;
}
