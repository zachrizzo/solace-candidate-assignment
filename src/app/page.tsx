"use client";

import { useEffect, useState } from "react";

// Define type for advocate
interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string;
  phoneNumber: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const searchTermElement = document.getElementById("search-term");

    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="m-6">
      <h1 className="text-2xl font-bold">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p className="font-medium">Search</p>
        <p>
          Searching for: <span id="search-term" className="font-semibold"></span>
        </p>
        <input className="border border-gray-400 p-2 rounded" onChange={onChange} />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">First Name</th>
            <th className="border p-2 text-left">Last Name</th>
            <th className="border p-2 text-left">City</th>
            <th className="border p-2 text-left">Degree</th>
            <th className="border p-2 text-left">Specialties</th>
            <th className="border p-2 text-left">Years of Experience</th>
            <th className="border p-2 text-left">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">{advocate.firstName}</td>
                <td className="border p-2">{advocate.lastName}</td>
                <td className="border p-2">{advocate.city}</td>
                <td className="border p-2">{advocate.degree}</td>
                <td className="border p-2">
                  {advocate.specialties.map((s, i) => (
                    <div key={i} className="mb-1">{s}</div>
                  ))}
                </td>
                <td className="border p-2">{advocate.yearsOfExperience}</td>
                <td className="border p-2">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
