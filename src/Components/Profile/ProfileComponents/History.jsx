import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box,   } from "@mantine/core";
const History = () => {
  //should be memoized or stable
  const [data, setData] = useState([]);

  const fetchLeaderboard = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/score/leaderBoard`
    //
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const status = res.status;
      console.log(status);
      setData(data.scores);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => { fetchLeaderboard() }, [])


  const columns = useMemo(
    () => [
      {
        accessorKey: 'rank', //access nested data with dot notation
        header: 'Rank',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'speed',
        header: 'Speed(wpm)',
      },
      {
        accessorKey: 'accuracy',
        header: 'Accuracy',
      },
      
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <>
      <Box align={'center'} justify={'center'} h={'100vh'} mih={'100vh'} direction={'column'}>
        {data.length > 0 && <MantineReactTable table={table} />}
      </Box>
    </>);
};

export default History;