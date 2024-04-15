"use client";
import { Button, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Denegado() {
  const router = useRouter();

  return (
    <Center minH="60vh" w="100%" flexDir="column">
      <Text fontSize="6xl" textAlign="center">
        No posee los permisos necesarios para ver esta página
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        mt="10"
        onClick={() => router.push("/inicio")}
      >
        Volver al inicio
      </Button>
    </Center>
  );
}