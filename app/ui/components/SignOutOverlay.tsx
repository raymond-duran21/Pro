"use client";
import { clearCache } from "@/utils/clearCache";
import { Box, Button, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

interface SignOutOverlayProps {}

const SignOutOverlay: FC<SignOutOverlayProps> = ({}) => {
  const session = useSession();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (session?.data?.error === "RefreshAccessTokenError") {
      setShowOverlay(true);
    }
  }, [session]);
  return (
    <>
      {showOverlay && (
        <Box
          position="fixed"
          inset={0}
          zIndex={9999}
          background="rgba(0, 0, 0, 0.5)"
        >
          <Center height="100vh">
            <Flex
              background="white"
              py={4}
              flexDir="column"
              justifyItems="center"
              alignItems="center"
              gap={2}
              borderRadius="md"
            >
              <Text fontSize="2xl" fontWeight="semibold" px={10}>
                Tu sesión ha caducado
              </Text>
              <Text>Vuelve a iniciar sesión.</Text>
              <Divider w="100%" borderColor="gray" />
              <Button
                onClick={() => {
                  signOut();
                  clearCache();
                }}
                variant="ghost"
              >
                Aceptar
              </Button>
            </Flex>
          </Center>
        </Box>
      )}
    </>
  );
};

export default SignOutOverlay;