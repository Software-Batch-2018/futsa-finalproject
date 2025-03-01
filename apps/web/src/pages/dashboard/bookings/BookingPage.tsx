import Loading from "@/components/Loading";
import {
  Box,
  ToggleButton,
  Chip,
  CircularProgress,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useBookings from "@/hooks/useBookings";
import BookingsTable from "@/pages/dashboard/bookings/BookingsTable";
import { BOOKING_STATUS } from "core";
import { Refresh } from "@mui/icons-material";
import { BookingDetailModal } from "@/pages/dashboard/bookings/BookingDetailModal";
import useModal from "@/hooks/useModal";
import { useSearchParams } from "react-router-dom";

enum BOOKING_TYPE_ENUM {
  UPCOMING = "upcoming",
  BOOKED = "booked",
  CANCELLED = "cancelled",
  REJECTED = "rejected",
}

const BookingPage = () => {
  const { fetchingData, bookingsByStatus, refetch } = useBookings();
  const [alignment, setAlignment] = useState<BOOKING_TYPE_ENUM>(
    BOOKING_TYPE_ENUM.UPCOMING
  );
  const { open, onOpen, onClose } = useModal();
  const [id] = useSearchParams();
  console.log(id);

  const handleAlignMent = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: BOOKING_TYPE_ENUM
  ) => {
    event.preventDefault();
    setAlignment(newAlignment);
  };

  if (fetchingData) {
    return <Loading />;
  }
  const buttons = Object.entries(BOOKING_TYPE_ENUM).map((entry) => (
    <ToggleButton key={entry[0]} value={entry[1]}>
      {entry[1]}
    </ToggleButton>
  ));

  return (
    <Box
      sx={{
        paddingY: "10px",
        height: "105%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" marginBottom={2}>
          Pending Bookings
        </Typography>
        <Chip
          label="Refresh"
          onClick={() => refetch()}
          icon={fetchingData ? <CircularProgress size={20} /> : <Refresh />}
          variant="outlined"
        />
      </Stack>
      <Box>
        <BookingsTable
          bookings={bookingsByStatus.pendings}
          type={BOOKING_STATUS.PENDING}
          modalOnOpen={onOpen}
        />
      </Box>
      <br />
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignMent}
        aria-label="Platform"
        sx={{
          marginBottom: "10px",
          "& .MuiToggleButton-root": {
            fontWeight: "bold",
            textTransform: "capitalize",
            borderRadius: "10px",
            paddingX: "15px",
          },
        }}
      >
        {buttons}
      </ToggleButtonGroup>

      <Box>
        <BookingsTable
          bookings={bookingsByStatus[alignment]}
          type={BOOKING_STATUS.BOOKED}
          modalOnOpen={onOpen}
        />
      </Box>
      <BookingDetailModal
        bookingId={id.get("id") ?? ""}
        modalOnClose={() => {
          id.delete("id");
          onClose();
        }}
        modalOpen={open}
      />
    </Box>
  );
};

export default BookingPage;
