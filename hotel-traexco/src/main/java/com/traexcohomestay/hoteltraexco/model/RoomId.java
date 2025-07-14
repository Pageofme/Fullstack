package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class RoomId implements Serializable {
    private static final long serialVersionUID = -3207978839167396026L;

    @Column(name = "homestay_id", nullable = false)
    private Integer homestayId;

    @Column(name = "room_number", nullable = false, length = 10)
    private String roomNumber;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomId roomId = (RoomId) o;
        return Objects.equals(homestayId, roomId.homestayId) &&
                Objects.equals(roomNumber, roomId.roomNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(homestayId, roomNumber);
    }

    @Override
    public String toString() {
        return "RoomId{" +
                "homestayId=" + homestayId +
                ", roomNumber='" + roomNumber + '\'' +
                '}';
    }
}