const Address = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-center text-sky-600 text-3xl font-semibold">
        Available Diagnosis Test Center Locations
      </h2>
      <ul className="ms-14 py-20 text-lg font-medium space-y-10 text-left">
        <li>
          <span className="bg-green-600 text-white px-5 py-2 mr-2 rounded-sm">Sylhet:</span>
          2/3A, Bihongo Building, Amborkhana
        </li>
        <li>
          <span className="bg-green-600 text-white px-5 py-2 mr-2 rounded-sm">Dhaka:</span>
          4/H, Ikada Bhaban, Mirpur
        </li>
        <li>
          <span className="bg-green-600 text-white px-5 py-2 mr-2 rounded-sm">Dhaka:</span>
          22/K Block, Azadi Building, Dhadmondi
        </li>
        <li>
          <span className="bg-green-600 text-white px-5 py-2 mr-2 rounded-sm">Khulna:</span>
          44/10, Muktar Tower, Khulna.
        </li>
        <li>
          <span className="bg-green-600 text-white px-5 py-2 mr-2 rounded-sm">Rajshahi:</span>
          30/A, Ubosbon Garden, Rajshahi.
        </li>
        <li>
          <span className="bg-green-600 text-white px-5 py-2 mr-2 rounded-sm">Chittagong:</span>
          50/1, Division Cricket Stadium Market, Chittagong.
        </li>
      </ul>
    </section>
  )
}

export default Address