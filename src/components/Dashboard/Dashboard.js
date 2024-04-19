import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import SiteChart from "./Chart/SiteChart";
import QuotesChart from "./Chart/QuotesChart";
import Table from "../../UI/Table/Table";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";

const Dashboard = () => {
  const [siteData, setSiteData] = useState([]);
  const [quoteData, setQuoteData] = useState();
  const [companyData, setCompanyData] = useState();

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData("sites/get/site/latest/", setSiteData);
    fetchData("quote/generate-quote-latest/", setQuoteData);
    fetchData("company/", setCompanyData);
  }, []);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const siteDashboard = (params) => (
    <Link to={`/site/${params.data.id}`}>{params.value}</Link>
  );

  const siteColumns = [
    {
      headerName: "Site Name",
      field: "site_name",
      cellRenderer: siteDashboard,
      filter: true,
    },
    { headerName: "Type Of Owner", field: "type_of_owner", filter: true },
    { headerName: "Owner Name", field: "owner_name", filter: true },
    { headerName: "Company", field: "company.name", filter: true },
    { headerName: "Agent Email", field: "agent_email", filter: true },
    {
      headerName: "Bill To Sent",
      field: "bill_to_sent",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Change Of Tenancy",
      field: "change_of_tenancy",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Customer Consent",
      field: "customer_consent",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    { headerName: "Notes", field: "notes", filter: true },
  ];

  const quoteColumns = [
    {
      headerName: "Site Name",
      field: "site.site_name",
      filter: true,
    },
    {
      headerName: "Supplier",
      field: "supplier",
      filter: true,
    },
    {
      headerName: "Product",
      field: "product",
      filter: true,
    },
    {
      headerName: "Term",
      field: "term",
      filter: true,
    },
    {
      headerName: "Day Rate (pence/kWh)",
      field: "day_rate",
      filter: true,
    },
    {
      headerName: "Night Rate (pence/kWh)",
      field: "night_rate",
      filter: true,
    },
    {
      headerName: "Standing Charge (pence)",
      field: "standing_charge",
      filter: true,
    },
    {
      headerName: "KVA Charge (pence)",
      field: "kva_charge",
      filter: true,
    },
    {
      headerName: "Additional Charge(£)",
      field: "additional_charge",
      filter: true,
    },
    {
      headerName: "Extra info",
      field: "extra_info",
      filter: true,
    },
    {
      headerName: "Up Lift",
      field: "up_lift",
      filter: true,
    },
    {
      headerName: "Rates Already Include At Uplift",
      field: "rates_already_include_at_uplift",
      filter: true,
      cellRenderer: renderItemAvailable,
    },
  ];

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
      </div>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Sites</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-diagram-3-fill"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{siteData?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">Quotes</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-buildings"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{quoteData?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-xl-12">
                <div className="card info-card customers-card">
                  <div className="card-body">
                    <h5 className="card-title">Company</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-buildings"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{companyData?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card recent-sales overflow-auto">
                  <div className="card-body">
                    <h5 className="card-title">Recent Sites</h5>
                    <Table rowData={siteData} columnDefs={siteColumns} />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card top-selling overflow-auto">
                  <div className="card-body">
                    <h5 className="card-title">Recent Quotes</h5>
                    <Table rowData={quoteData} columnDefs={quoteColumns} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body pb-0">
                <h5 className="card-title">Site Report</h5>
                <div style={{ minHeight: "290px" }}>
                  <SiteChart siteData={siteData} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body pb-0">
                <h5 className="card-title">Quote Report</h5>
                <div style={{ minHeight: "290px" }}>
                  <QuotesChart quoteData={quoteData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
