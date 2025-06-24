"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, TouchableOpacity, Animated, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const ITEM_SIZE = 70
const PLACEHOLDER_IMAGE = "https://placehold.co/40x40/png"
const { height: screenHeight } = Dimensions.get("window")

interface Item {
  id: string
  imageUrl: string
  text: string
  isPlaced: boolean
  dropZoneId: string | null
}

interface DropZone {
  id: string
  occupiedBy: string | null
}

export default function DragDropExercise() {
  const router = useRouter()
  const [progress, setProgress] = useState(15)
  const [items, setItems] = useState<Item[]>([])
  const [dropZones, setDropZones] = useState<DropZone[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  // Animation references with enhanced properties
  const animations = useRef<{
    [key: string]: {
      position: Animated.ValueXY
      scale: Animated.Value
      opacity: Animated.Value
      rotation: Animated.Value
    }
  }>({})
  const itemPositions = useRef<{ [key: string]: { x: number; y: number } }>({})
  const dropZonePositions = useRef<{ [key: string]: { x: number; y: number } }>({})

  // Exercise data
  const exerciseData = {
    title: "Traduce la oración",
    referenceText: "El gato negro duerme en la cama grande",
    instruction: "Toca las imágenes para formar la oración en lenguaje de señas",
    correctOrder: ["El", "gato", "negro", "duerme", "en", "la", "cama", "grande"],
    wordImages: Array(8).fill(PLACEHOLDER_IMAGE),
  }

  useEffect(() => {
    // Initialize items
    const wordItems: Item[] = exerciseData.correctOrder.map((word, index) => ({
      id: `item-${index}`,
      imageUrl: exerciseData.wordImages[index] || PLACEHOLDER_IMAGE,
      text: word,
      isPlaced: false,
      dropZoneId: null,
    }))

    const shuffledItems = [...wordItems].sort(() => Math.random() - 0.5)
    setItems(shuffledItems)

    // Initialize drop zones
    const zones: DropZone[] = Array(8)
      .fill(null)
      .map((_, index) => ({
        id: `zone-${index}`,
        occupiedBy: null,
      }))

    setDropZones(zones)

    // Initialize enhanced animations
    shuffledItems.forEach((item) => {
      animations.current[item.id] = {
        position: new Animated.ValueXY({ x: 0, y: 0 }),
        scale: new Animated.Value(1),
        opacity: new Animated.Value(1),
        rotation: new Animated.Value(0),
      }
    })
  }, [])

  const findFirstAvailableZone = (): string | null => {
    const availableZone = dropZones.find((zone) => zone.occupiedBy === null)
    return availableZone ? availableZone.id : null
  }

  const handleItemClick = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (!item || item.isPlaced) return

    const targetZoneId = findFirstAvailableZone()
    if (!targetZoneId) return

    const dropZonePosition = dropZonePositions.current[targetZoneId]
    const itemPosition = itemPositions.current[itemId]

    if (dropZonePosition && itemPosition && animations.current[itemId]) {
      const { position, scale, opacity, rotation } = animations.current[itemId]

      // Enhanced animation sequence with smoother transitions
      Animated.sequence([
        // Initial lift-off effect
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1.15,
            friction: 4,
            tension: 100,
            useNativeDriver: false,
          }),
          Animated.timing(rotation, {
            toValue: 0.1,
            duration: 150,
            useNativeDriver: false,
          }),
        ]),
        // Smooth movement to target with easing
        Animated.parallel([
          Animated.timing(position, {
            toValue: {
              x: dropZonePosition.x - itemPosition.x,
              y: dropZonePosition.y - itemPosition.y,
            },
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 0.95,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 6,
              tension: 80,
              useNativeDriver: false,
            }),
          ]),
          Animated.timing(rotation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
          }),
        ]),
      ]).start()

      // Update state
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === itemId ? { ...i, isPlaced: true, dropZoneId: targetZoneId } : i)),
      )

      setDropZones((prevZones) =>
        prevZones.map((zone) => (zone.id === targetZoneId ? { ...zone, occupiedBy: itemId } : zone)),
      )
    }
  }

  const removeItemFromZone = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (!item || !item.dropZoneId) return

    const { position, scale, opacity, rotation } = animations.current[itemId]

    // Enhanced return animation with bounce effect
    Animated.sequence([
      // Initial shrink and slight rotation
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.85,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(rotation, {
          toValue: -0.1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
      // Smooth return with bounce
      Animated.parallel([
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          tension: 70,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 1.1,
            friction: 4,
            tension: 100,
            useNativeDriver: false,
          }),
          Animated.spring(scale, {
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: false,
          }),
        ]),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
    ]).start()

    // Update state
    setItems((prevItems) => prevItems.map((i) => (i.id === itemId ? { ...i, isPlaced: false, dropZoneId: null } : i)))

    setDropZones((prevZones) =>
      prevZones.map((zone) => (zone.id === item.dropZoneId ? { ...zone, occupiedBy: null } : zone)),
    )
  }

  const checkAnswer = () => {
    const currentOrder = dropZones.map((zone) => {
      const placedItem = items.find((item) => item.dropZoneId === zone.id)
      return placedItem ? placedItem.text : ""
    })

    const isAnswerCorrect = currentOrder.join(" ") === exerciseData.correctOrder.join(" ")
    setIsCorrect(isAnswerCorrect)
    setIsComplete(true)
  }

  const handleContinue = () => {
    if (isComplete) {
      setProgress((prev) => Math.min(prev + 15, 100))

      if (progress >= 100) {
        router.back()
      } else {
        resetExercise()
      }
    } else {
      checkAnswer()
    }
  }

  const handleTryAgain = () => {
    resetExercise()
  }

  const resetExercise = () => {
    setIsCorrect(null)
    setIsComplete(false)

    // Enhanced reset with staggered animations
    items.forEach((item, index) => {
      if (animations.current[item.id]) {
        setTimeout(() => {
          const { position, scale, opacity, rotation } = animations.current[item.id]

          Animated.parallel([
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              friction: 6,
              tension: 80,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 6,
              tension: 80,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start()
        }, index * 50) // Staggered animation
      }
    })

    // Reset state and shuffle items again
    const shuffledItems = [...items].sort(() => Math.random() - 0.5)
    setItems(
      shuffledItems.map((item) => ({
        ...item,
        isPlaced: false,
        dropZoneId: null,
      })),
    )

    setDropZones(
      dropZones.map((zone) => ({
        ...zone,
        occupiedBy: null,
      })),
    )
  }

  const renderSelectableItem = (item: Item) => {
    if (!animations.current[item.id]) return null

    const { position, scale, opacity, rotation } = animations.current[item.id]

    return (
      <Animated.View
        key={item.id}
        style={[
          {
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { scale: scale },
              {
                rotate: rotation.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ["-10deg", "10deg"],
                }),
              },
            ],
            opacity: item.isPlaced ? 0 : opacity,
            zIndex: item.isPlaced ? 1000 : 1,
          },
        ]}
        onLayout={(event) => {
          const { x, y } = event.nativeEvent.layout
          itemPositions.current[item.id] = { x, y }
        }}
      >
        <TouchableOpacity
          className="bg-white rounded-lg justify-center items-center shadow-sm active:opacity-70"
          style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
          onPress={() => !item.isPlaced && handleItemClick(item.id)}
          activeOpacity={0.7}
          disabled={item.isPlaced}
        >
          <Image source={{ uri: item.imageUrl }} className="w-10 h-10" resizeMode="contain" />
        </TouchableOpacity>
      </Animated.View>
    )
  }

  const renderDropZone = (zone: DropZone) => {
    const isOccupied = zone.occupiedBy !== null
    const occupiedItem = items.find((item) => item.id === zone.occupiedBy)

    return (
      <TouchableOpacity
        key={zone.id}
        className={`border-2 border-dashed rounded-lg justify-center items-center transition-colors ${
          isOccupied ? "border-green-400 bg-green-50" : "border-gray-300 bg-transparent"
        }`}
        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
        onPress={() => {
          if (isOccupied && zone.occupiedBy) {
            removeItemFromZone(zone.occupiedBy)
          }
        }}
        onLayout={(event) => {
          event.target.measure((fx, fy, width, height, px, py) => {
            dropZonePositions.current[zone.id] = { x: px, y: py }
          })
        }}
        disabled={!isOccupied}
      >
        {isOccupied && occupiedItem && (
          <Image source={{ uri: occupiedItem.imageUrl }} className="w-10 h-10" resizeMode="contain" />
        )}
      </TouchableOpacity>
    )
  }

  // Check if all zones are filled
  const allZonesFilled = dropZones.every((zone) => zone.occupiedBy !== null)

  // Calculate dynamic heights
  const headerHeight = 80
  const titleHeight = 60
  const dropZonesHeight = 180
  const selectableItemsHeight = 180
  const buttonHeight = 80
  const feedbackHeight = isComplete ? 60 : 0

  const usedHeight =
    headerHeight + titleHeight + dropZonesHeight + selectableItemsHeight + buttonHeight + feedbackHeight + 40 // padding
  const remainingHeight = Math.max(screenHeight - usedHeight, 120)

  return (
    <View className="flex-1  p-4 relative">
      {/* Title */}
      <Text className="text-2xl font-bold text-secondary" style={{ height: titleHeight }}>
        {exerciseData.title}
      </Text>

      {/* Image and Reference Text - Dynamic height */}
      <View className="justify-center mb-2" style={{ height: remainingHeight }}>
        <View className="flex-row items-center">
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1723677830955-90e9bcdae719?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-20 h-20 mr-3 rounded-full"
            resizeMode="cover"
          />
          <View className="flex-1 bg-blue-500 rounded-xl p-4 pl-10 relative">
            <View className="absolute left-3 top-4">
              <Ionicons name="volume-high" size={20} color="white" />
            </View>
            <Text className="text-white text-base">{exerciseData.referenceText}</Text>
          </View>
        </View>
      </View>

      {/* Drop Zones */}
      <View className="mb-3" style={{ height: dropZonesHeight }}>
        
        <View className="flex-row justify-between mb-3">
          {dropZones.slice(0, 4).map((zone) => renderDropZone(zone))}
        </View>
        <View className="flex-row justify-between mb-3">{dropZones.slice(4).map((zone) => renderDropZone(zone))}</View>
      </View>

      {/* Selectable Items */}
      <View className="my-2" style={{ height: selectableItemsHeight }}>
        
        <View className="flex-row justify-between mb-3">
          {items.slice(0, 4).map((item) => renderSelectableItem(item))}
        </View>
        <View className="flex-row justify-between">
          {items.slice(4).map((item) => renderSelectableItem(item))}
        </View>
      </View>

      {/* Feedback */}
      {isComplete && (
        <View
          className={`flex-row items-center justify-center p-3 rounded-lg mb-4 ${
            isCorrect ? "bg-green-50" : "bg-red-50"
          }`}
          style={{ height: feedbackHeight }}
        >
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={24}
            color={isCorrect ? "green" : "red"}
          />
          <Text className="ml-2 text-base font-medium">{isCorrect ? "¡Correcto!" : "Respuesta incorrecta"}</Text>
        </View>
      )}

      {/* Continue Button */}
      <TouchableOpacity
        disabled={!allZonesFilled}
        className={`rounded-lg p-4 items-center ${
          !allZonesFilled ? "bg-gray-400" : isComplete && isCorrect ? "bg-blue-600" : "bg-blue-500"
        }`}
        style={{ height: buttonHeight }}
        onPress={handleContinue}
      >
        <Text className="text-white text-base font-bold">Continuar</Text>
      </TouchableOpacity>

      {/* Try Again Button - Absolute positioned */}
      {isComplete && !isCorrect && (
        <TouchableOpacity
          className="bg-orange-500 rounded-lg p-3 items-center absolute bottom-4 left-4 right-4"
          onPress={handleTryAgain}
          style={{ zIndex: 1000 }}
        >
          <Text className="text-white text-base font-bold">Inténtalo de nuevo</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
