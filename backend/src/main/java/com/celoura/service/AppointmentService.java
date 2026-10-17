package com.celoura.service;

import com.celoura.model.Appointment;
import com.celoura.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment createAppointment(Appointment appointment) {
        if (appointment.getStatus() == null) {
            appointment.setStatus("Pending");
        }
        return appointmentRepository.save(appointment);
    }
}
