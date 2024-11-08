const columns = [
	{ name: "ID", uid: "id", sortable: true },
	{ name: "NOMOR", uid: "nomorRM", sortable: true },
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "TANGGAL", uid: "createdat", sortable: true },
	{ name: "STATUS", uid: "status", sortable: true },
	{ name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
	{ name: "Sudah Selesai diperiksa", uid: "Sudah Selesai diperiksa" },
	{ name: "Belum Selesai diperiksa", uid: "Belum Selesai diperiksa" },
	{ name: "Ditolak", uid: "Ditolak" },
];

const users = [
	{
		id: 1,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Tony Reichert",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 2,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Zoey Lang",
		status: "Belum Selesai diperiksa",
	},
	{
		id: 3,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Jane Fisher",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 4,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "William Howard",
		status: "Ditolak",
	},
	{
		id: 5,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Kristen Copper",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 6,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Brian Kim",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 7,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Michael Hunt",
		status: "Belum Selesai diperiksa",
	},
	{
		id: 8,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Samantha Brooks",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 9,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Frank Harrison",
		status: "Ditolak",
	},
	{
		id: 10,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Emma Adams",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 11,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Brandon Stevens",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 12,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Megan Richards",
		status: "Belum Selesai diperiksa",
	},
	{
		id: 13,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Oliver Scott",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 14,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Grace Allen",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 15,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Noah Carter",
		status: "Belum Selesai diperiksa",
	},
	{
		id: 16,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Ava Perez",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 17,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Liam Johnson",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 18,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Sophia Taylor",
		status: "Sudah Selesai diperiksa",
	},
	{
		id: 19,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Lucas Harris",
		status: "Belum Selesai diperiksa",
	},
	{
		id: 20,
		nomorRM:'100',
		createdat:"2023-11-11",
		name: "Mia Robinson",
		status: "Sudah Selesai diperiksa",
	},
];

export { columns, users, statusOptions };
