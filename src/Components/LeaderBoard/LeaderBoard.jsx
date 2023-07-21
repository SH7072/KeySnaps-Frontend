import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    "rank": 1,
    "username": "user_1",
    "speed": 92,
    "accuracy": 0.94,
    "test": 19
  },
  {
    "rank": 2,
    "username": "user_2",
    "speed": 86,
    "accuracy": 0.85,
    "test": 42
  },
  {
    "rank": 3,
    "username": "user_3",
    "speed": 60,
    "accuracy": 0.87,
    "test": 13
  },
  {
    "rank": 4,
    "username": "user_4",
    "speed": 57,
    "accuracy": 0.92,
    "test": 32
  },
  {
    "rank": 5,
    "username": "user_5",
    "speed": 62,
    "accuracy": 0.83,
    "test": 25
  },
  {
    "rank": 6,
    "username": "user_6",
    "speed": 89,
    "accuracy": 0.88,
    "test": 47
  },
  {
    "rank": 7,
    "username": "user_7",
    "speed": 99,
    "accuracy": 0.91,
    "test": 14
  },
  {
    "rank": 8,
    "username": "user_8",
    "speed": 83,
    "accuracy": 0.95,
    "test": 30
  },
  {
    "rank": 9,
    "username": "user_9",
    "speed": 94,
    "accuracy": 0.86,
    "test": 18
  },
  {
    "rank": 10,
    "username": "user_10",
    "speed": 88,
    "accuracy": 0.89,
    "test": 38
  },
  {
    "rank": 11,
    "username": "user_11",
    "speed": 65,
    "accuracy": 0.93,
    "test": 49
  },
  {
    "rank": 12,
    "username": "user_12",
    "speed": 67,
    "accuracy": 0.91,
    "test": 32
  },
  {
    "rank": 13,
    "username": "user_13",
    "speed": 84,
    "accuracy": 0.84,
    "test": 19
  },
  {
    "rank": 14,
    "username": "user_14",
    "speed": 79,
    "accuracy": 0.96,
    "test": 16
  },
  {
    "rank": 15,
    "username": "user_15",
    "speed": 76,
    "accuracy": 0.82,
    "test": 28
  },
  {
    "rank": 16,
    "username": "user_16",
    "speed": 76,
    "accuracy": 0.89,
    "test": 38
  },
  {
    "rank": 17,
    "username": "user_17",
    "speed": 72,
    "accuracy": 0.9,
    "test": 27
  },
  {
    "rank": 18,
    "username": "user_18",
    "speed": 71,
    "accuracy": 0.88,
    "test": 43
  },
  {
    "rank": 19,
    "username": "user_19",
    "speed": 80,
    "accuracy": 0.92,
    "test": 12
  },
  {
    "rank": 20,
    "username": "user_20",
    "speed": 80,
    "accuracy": 0.81,
    "test": 38
  },
  {
    "rank": 21,
    "username": "user_21",
    "speed": 74,
    "accuracy": 0.89,
    "test": 32
  },
  {
    "rank": 22,
    "username": "user_22",
    "speed": 76,
    "accuracy": 0.96,
    "test": 41
  },
  {
    "rank": 23,
    "username": "user_23",
    "speed": 57,
    "accuracy": 0.95,
    "test": 23
  },
  {
    "rank": 24,
    "username": "user_24",
    "speed": 86,
    "accuracy": 0.92,
    "test": 41
  },


];

const LeaderBoard = () => {
  //should be memoized or stable
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
      {
        accessorKey: 'test', //normal accessorKey
        header: 'Total Tests',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MantineReactTable table={table} />;
};

export default LeaderBoard;