import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import CheckTable from "./components/CheckTable";
import { session } from "@supabase/supabase-js";

const supabaseUrl = "https://rkchmxczmfbkjysxrqzm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrY2hteGN6bWZia2p5c3hycXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzOTE3MjksImV4cCI6MTk5ODk2NzcyOX0.FbsVqj3oOTjnB4BWo7x5M3iLvzUpHkS7yIqXWy1zXX0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UserReports() {
  const [earnings, setEarnings] = useState(null);
  const [spendThisMonth, setSpendThisMonth] = useState(null);

  useEffect(() => {
    // Fetch initial user data
    fetchUserData();

    // Fetch user data every 8 seconds
    const interval = setInterval(fetchUserData, 5000);
    console.log("login")

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  async function fetchUserData() {
    try {
      const { data: userData, error: userError } = await supabase
        .from("usersearn")
        .select("earnings, spendthismonth")
        .limit(1);

      if (userError) {
        console.error("Error fetching user data:", userError);
      } else if (userData && userData.length > 0) {
        const user = userData[0];
        setEarnings(user?.earnings);
        setSpendThisMonth(user?.spendthismonth);
      }


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if (earnings === null || spendThisMonth === null) {
    // Display loading state or return null while fetching data
    return null;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap="20px" mb="20px">
        <MiniStatistics name="Earnings" value={`$${earnings}`} />
        <MiniStatistics name="Spend this month" value={`$${spendThisMonth}`} />
      </SimpleGrid>
    </Box>
  );
}
