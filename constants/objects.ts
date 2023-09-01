import { DepartmentProps } from "./types";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GrServices } from "react-icons/gr";
import { BsShop } from "react-icons/bs";
import { TbAirConditioning } from "react-icons/tb";
import { FaGripfire } from "react-icons/fa";
import { PiMathOperationsBold } from "react-icons/pi";
import { LiaFileContractSolid } from "react-icons/lia";

export const Departments: DepartmentProps[] = [
  {
    url: "refrigeration",
    label: "Refrigeration",
    value: "Refrigeration",
    icon: CgSmartHomeRefrigerator,
  },
  { url: "service", label: "Service", value: "Service", icon: GrServices },
  {
    url: "shopfitting-and-warehouse-racking",
    label: "Shopfitting and Warehouse Racking",
    value: "Shopfitting and Warehouse Racking",
    icon: BsShop,
  },
  { url: "hvac", label: "HVAC", value: "HVAC", icon: TbAirConditioning },
  { url: "mepfs", label: "MEPFS", value: "MEPFS", icon: FaGripfire },
  {
    url: "cons-operations",
    label: "CONS - Operations",
    value: "CONS - Operations",
    icon: PiMathOperationsBold,
  },
  {
    url: "cons-document-billing-and-contracts",
    label: "CONS - Document, Billing and Contracts",
    value: "CONS - Document, Billing and Contracts",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-document-management",
    label: "CONS - Document Management",
    value: "CONS - Document Management",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-cost-control",
    label: "CONS - Cost Control",
    value: "CONS - Cost Control",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-tsg",
    label: "CONS - TSG",
    value: "CONS - TSG",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-tender",
    label: "CONS - Tender",
    value: "CONS - Tender",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-qaqc",
    label: "CONS - QAQC",
    value: "CONS - QAQC",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-formworks",
    label: "CONS - Formworks",
    value: "CONS - Formworks",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-rebar",
    label: "CONS - Rebar",
    value: "CONS - Rebar",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-foundation",
    label: "CONS - Foundation",
    value: "CONS - Foundation",
    icon: LiaFileContractSolid,
  },
  {
    url: "cons-equipment",
    label: "CONS - Equipment",
    value: "CONS - Equipment",
    icon: LiaFileContractSolid,
  },
  {
    url: "management-accounting",
    label: "Management Accounting",
    value: "Management Accounting",
    icon: LiaFileContractSolid,
  },
  {
    url: "treasury",
    label: "Treasury",
    value: "Treasury",
    icon: LiaFileContractSolid,
  },
  { url: "audit", label: "Audit", value: "Audit", icon: LiaFileContractSolid },
  {
    url: "human-resources",
    label: "Human Resources",
    value: "Human Resources",
    icon: LiaFileContractSolid,
  },
  { url: "it", label: "IT", value: "IT", icon: LiaFileContractSolid },
  { url: "ehs", label: "EHS", value: "EHS", icon: LiaFileContractSolid },
  {
    url: "strategic-business-growth",
    label: "Strategic Business Growth",
    value: "Strategic Business Growth",
    icon: LiaFileContractSolid,
  },
  {
    url: "government-relations",
    label: "Government Relations",
    value: "Government Relations",
    icon: LiaFileContractSolid,
  },
  {
    url: "importation",
    label: "Importation",
    value: "Importation",
    icon: LiaFileContractSolid,
  },
  {
    url: "purchasing",
    label: "Purchasing",
    value: "Purchasing",
    icon: LiaFileContractSolid,
  },
  {
    url: "warehouse-and-logistics",
    label: "Warehouse & Logistics",
    value: "Warehouse & Logistics",
    icon: LiaFileContractSolid,
  },
];
