import React from "react";
import {
  Paper,
  Box,
  Avatar,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import { CameraAltRounded, VerifiedUserRounded } from "@mui/icons-material";
import { motion } from "framer-motion";

const ProfileCard = ({
  profile,
  loading,
  roleStyle,
  handlePhotoClick,
  handlePhotoChange,
  fileInputRef,
}) => {
  // Helper to format image
  const getProfileSrc = () => {
    if (profile.profileImage) {
      // Add timestamp to force reload
      return `http://localhost:8080/uploads/profile-images/${
        profile.profileImage
      }?t=${new Date().getTime()}`;
    }
    return undefined; // undefined allows Avatar fallback to initials
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "32px",
          overflow: "hidden",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Box
          sx={{
            height: "140px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/cubes.png")',
              opacity: 0.1,
            }}
          />
        </Box>

        <Box sx={{ px: 4, pb: 4, textAlign: "center", mt: -7 }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={profile.profileImage ? getProfileSrc() : undefined}
              sx={{
                width: 120,
                height: 120,
                border: "6px solid #fff",
                bgcolor: "#1e293b",
                fontSize: "3rem",
                fontWeight: 700,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
            >
              {!profile.profileImage && profile.name
                ? profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()
                : null}
            </Avatar>

            <IconButton
              sx={{
                position: "absolute",
                bottom: 5,
                right: 5,
                bgcolor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
              size="small"
              onClick={handlePhotoClick}
            >
              <CameraAltRounded sx={{ fontSize: 18, color: "#64748b" }} />
            </IconButton>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </Box>

          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#0f172a", mt: 2 }}
          >
            {loading ? "Loading..." : profile.name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: roleStyle.bg,
                px: 2,
                py: 0.8,
                borderRadius: "100px",
              }}
            >
              <Box sx={{ color: roleStyle.color, display: "flex" }}>
                {roleStyle.icon}
              </Box>
              <Typography
                sx={{
                  color: roleStyle.color,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                {profile.role || "MEMBER"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 2.5,
              bgcolor: "#f8fafc",
              borderRadius: "20px",
              border: "1px solid #f1f5f9",
              textAlign: "left",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
              <VerifiedUserRounded sx={{ fontSize: 20, color: "#10b981" }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#64748b",
                  letterSpacing: "0.05em",
                }}
              >
                SECURITY STATUS
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "#334155", lineHeight: 1.6 }}
            >
              Your account is fully verified and protected by enterprise-grade
              encryption.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default ProfileCard;
